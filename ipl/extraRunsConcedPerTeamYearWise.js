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
}

module.exports = extraRunsConcedPerTeamYearWise;
