function extraRunsConcedPerTeamYearWise(matches, deliveries) {
  const result = {};
  for (let match of matches) {
    for (let game of deliveries) {
      if (match.id === game.match_id) {
        if (result[match.season]) {
          const extraRuns = Number(game.extra_runs);
          if (result[match.season][game.bowling_team]) {
            result[match.season][game.bowling_team] += extraRuns;
          } else {
            result[match.season][game.bowling_team] = extraRuns;
          }
        } else {
          result[match.season] = {};
          const extraRuns = Number(game.extra_runs);
          result[match.season][game.bowling_team] = extraRuns;
        }
      }
    }
  }
  return result;
  // runs conceded by each team in may 2017
  // const result = {};
  // for (let match of matches) {
  //   if (match.season == "2017" && Number(match.date.split("-")[1]) == 4) {
  //     for (delivery of deliveries) {
  //       if (delivery.match_id == match.id) {
  //         if (result[delivery.bowling_team]) {
  //           if (result[delivery.bowling_team]["runsConceded"]) {
  //             result[delivery.bowling_team]["runsConceded"] += Number(
  //               delivery.total_runs
  //             );
  //           } else {
  //             result[delivery.bowling_team]["runsConceded"] = Number(
  //               delivery.total_runs
  //             );
  //           }
  //         } else {
  //           result[delivery.bowling_team] = {};
  //           result[delivery.bowling_team]["runsConceded"] = Number(
  //             delivery.total_runs
  //           );
  //         }
  //       }
  //     }
  //   }
  // }
  // console.log(result);
  //higest wicket taker in 2019
  // const result = {};
  // for (let match of matches) {
  //   if (match.season == "2019") {
  //     for (let game of deliveries) {
  //       if (game.match_id == match.id) {
  //         if (
  //           game.player_dismissed !== "" &&
  //           game.dismissal_kind != "run out"
  //         ) {
  //           if (result[game.bowler]) {
  //             if (result[game.bowler]["wicketsTaken"]) {
  //               result[game.bowler]["wicketsTaken"] += 1;
  //             } else {
  //               result[game.bowler]["wicketsTaken"] = 1;
  //             }
  //           } else {
  //             result[game.bowler] = {};
  //             result[game.bowler]["wicketsTaken"] = 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // console.log(result);

  //team that took the most number of wickets in 2019
  // const result = {};
  // for (let match of matches) {
  //   if (match.season == "2019") {
  //     for (let game of deliveries) {
  //       if (game.match_id == match.id) {
  //         if (game.player_dismissed !== "") {
  //           if (result[game.bowling_team]) {
  //             if (result[game.bowling_team]["wicketsTaken"]) {
  //               result[game.bowling_team]["wicketsTaken"] += 1;
  //             } else {
  //               result[game.bowling_team]["wicketsTaken"] = 1;
  //             }
  //           } else {
  //             result[game.bowling_team] = {};
  //             result[game.bowling_team]["wicketsTaken"] = 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // console.log(result);
}

module.exports = extraRunsConcedPerTeamYearWise;
