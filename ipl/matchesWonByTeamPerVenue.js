function matchesWonByTeamPerVenue(matches) {
  const result = {};
  matches.map((match) => {
    let winner = match.winner;
    let venue = match.venue;
    if (result[venue]) {
      if (result[venue][winner]) {
        result[venue][winner] += 1;
      } else {
        result[venue][winner] = 1;
      }
    } else {
      result[venue] = {};
      result[venue][winner] = 1;
    }
  });
  return result;
}

module.exports = matchesWonByTeamPerVenue;
