const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonPerTeam = require("./ipl/matchesWonPerTeam");
const extraRunsConcedPerTeamYearWise = require("./ipl/extraRunsConcedPerTeamYearWise");
const topTenEconomicalBowler = require("./ipl/topTenEconomicalBowler");
const matchesWonByTeamPerVenue = require("./ipl/matchesWonByTeamPerVenue");
const topTenScorer = require("./ipl/topTenScorer");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

var express = require("./node_modules/express");
var path = require("path");
var bodyParser = require("./node_modules/body-parser");
var data = require("./public/data.json"); // your json file path
var indexRouter = require("./routes/index");
var cors = require("./node_modules/cors");

var port = process.env.PORT || 3000;
var app = express();

// app.use(
//   cors({
//     origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
//     credentials: true,
//   })
// );

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //also hbs
app.engine("html", require("ejs").renderFile);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRouter);

/* GET extra runs. */
app.get("/extraruns", function (req, res, next) {
  const year = req.query.year;
  const result = data.runsConcededPerTeam[year];
  res.send(result);
});

/* GET economical bowler. */
app.get("/economy", function (req, res, next) {
  const year = req.query.year;
  const result = data.topTenEconomicalBowler[year];
  res.send(result);
});

//listen connection
app.listen(port, function () {
  console.log("Server satrted at port: " + port);
});

const jsonData = {};

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      let result = matchesPlayedPerYear(matches);
      let matchesWon = matchesWonPerTeam(matches);
      let matchesWonPerVenue = matchesWonByTeamPerVenue(matches);
      csv()
        .fromFile(DELIVERIES_FILE_PATH)
        .then((deliveries) => {
          let runsConceded = extraRunsConcedPerTeamYearWise(
            matches,
            deliveries
          );
          let economicalBowler = topTenEconomicalBowler(matches, deliveries);
          let topScorer = topTenScorer(matches, deliveries);
          saveData(
            result,
            matchesWon,
            runsConceded,
            economicalBowler,
            matchesWonPerVenue,
            topScorer
          );
        });
    });
}

function saveData(
  result,
  matchesWon,
  runsConceded,
  economicalBowler,
  matchesWonPerVenue,
  topScorer
) {
  jsonData["matchesPlayedPerYear"] = result;
  jsonData["matchesWonPerTeam"] = matchesWon;
  jsonData["runsConcededPerTeam"] = runsConceded;
  jsonData["topTenEconomicalBowler"] = economicalBowler;
  jsonData["matchesWonPerVenue"] = matchesWonPerVenue;
  jsonData["topTenScorer"] = topScorer;

  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
