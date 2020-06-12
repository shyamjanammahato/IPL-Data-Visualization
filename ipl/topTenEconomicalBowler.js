function topTenEconomicalBowler(matches, deliveries) {
  let finalResult = [];
  let result = {};

  matches = matches.filter((match) => match.season == "2015");

  matches.map((match) => {
    for (let game of deliveries) {
      if (match.id == game.match_id) {
        if (result[game.bowler]) {
          result[game.bowler]["runsConceded"] += Number(game.total_runs);
          if (Number(game.noball_runs) == 0 && Number(game.wide_runs) == 0)
            result[game.bowler]["bowls"] += 1;
        } else {
          result[game.bowler] = {};
          if (Number(game.noball_runs) == 0 && Number(game.wide_runs) == 0)
            result[game.bowler]["bowls"] = 1;
          else result[game.bowler]["bowls"] = 0;
          result[game.bowler]["runsConceded"] = Number(game.total_runs);
        }
      }
    }
  });
  let sortable = [];
  for (let bowler in result) {
    let economy = (
      result[bowler].runsConceded /
      (result[bowler].bowls / 6)
    ).toFixed(2);
    sortable.push([bowler, economy]);
  }

  sortable.sort((a, b) => {
    return a[1] - b[1];
  });
  // console.log(sortable);
  let count = 1;
  for (let item of sortable) {
    if (count <= 10) {
      finalResult.push({ bowler: item[0], economy: item[1] });
    } else break;
    count++;
  }

  return finalResult;
}
module.exports = topTenEconomicalBowler;
