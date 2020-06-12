function matchesWonPerTeam(matches) {
  const result = {};
  matches.map((match) => {
    let winner = match.winner;
    let season = match.season;
    if (result[season]) {
      if (winner == "") winner = "noResult";
      if (result[season][winner]) {
        result[season][winner] += 1;
      } else {
        result[season][winner] = 1;
      }
    } else {
      result[season] = {};
      result[season][winner] = 1;
    }
  });
  return result;
}

module.exports = matchesWonPerTeam;
