function extraRunsConcedPerTeamYearWise(matches, deliveries) {
  const result = {};
  for (let match of matches) {
    if (match.season == "2016") {
      for (let game of deliveries) {
        if (match.id === game.match_id) {
          const extraRuns = Number(game.extra_runs);
          if (result[game.bowling_team]) {
            result[game.bowling_team] += extraRuns;
          } else {
            result[game.bowling_team] = extraRuns;
          }
        }
      }
    }
  }

  return result;
}

module.exports = extraRunsConcedPerTeamYearWise;
