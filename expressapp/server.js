var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var data = require("../../ipl/public/data.json"); // your json file path
var indexRouter = require("./routes/index");
var cors = require("cors");

var port = 3000;
var app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    credentials: true,
  })
);

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
  console.log("Server satrted at port" + port);
});
