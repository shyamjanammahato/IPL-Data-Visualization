function topTenScorer(matches, deliveries) {
  let finalResult = [];
  let result = {};

  matches = matches.filter((match) => match.season == "2019");

  matches.map((match) => {
    for (let game of deliveries) {
      if (match.id == game.match_id) {
        if (result[game.batsman]) {
          result[game.batsman] += Number(game.batsman_runs);
        } else {
          result[game.batsman] = Number(game.batsman_runs);
        }
      }
    }
  });
  let sortable = [];
  for (let batsman in result) {
    sortable.push([batsman, result[batsman]]);
  }

  sortable.sort((a, b) => {
    return b[1] - a[1];
  });

  let count = 1;
  for (let item of sortable) {
    if (count <= 10) {
      finalResult.push({ batsman: item[0], runs: item[1] });
    } else break;
    count++;
  }
  // console.log(finalResult);
  return finalResult;
}
module.exports = topTenScorer;
