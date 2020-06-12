const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonPerTeam = require("./ipl/matchesWonPerTeam");
const extraRunsConcedPerTeamYearWise = require("./ipl/extraRunsConcedPerTeamYearWise");
const topTenEconomicalBowler = require("./ipl/topTenEconomicalBowler");
const matchesWonByTeamPerVenue = require("./ipl/matchesWonByTeamPerVenue");
const topScorerEachYear = require("./ipl/topScorerEachYear");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

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
          // let topScorer = topScorerEachYear(matches, deliveries);
          saveData(
            result,
            matchesWon,
            runsConceded,
            economicalBowler,
            matchesWonPerVenue
          );
        });
    });
}

function saveData(
  result,
  matchesWon,
  runsConceded,
  economicalBowler,
  matchesWonPerVenue
) {
  jsonData["matchesPlayedPerYear"] = result;
  jsonData["matchesWonPerTeam"] = matchesWon;
  jsonData["runsConcededPerTeam"] = runsConceded;
  jsonData["topTenEconomicalBowler"] = economicalBowler;
  jsonData["matchesWonPerVenue"] = matchesWonPerVenue;
  // jsonData["topScorerEachYear"] = topScorer;

  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.error(err);
    }
  });
}

main();
