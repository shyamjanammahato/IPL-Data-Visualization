function topScorerEachYear(matches, deliveries) {
  let finalResult = [];
  let result = {};

  matches.map((match) => {
    for (let game of deliveries) {
      if (match.id == game.match_id) {
        if (result[match.season]) {
          if (result[match.season][game.batsman]) {
            result[match.season][game.batsman] += Number(game.batsman_runs);
          } else {
            result[match.season][game.batsman] = {};
            result[match.season][game.batsman] = Number(game.batsman_runs);
          }
        } else {
          result[match.season] = {};
          result[match.season][game.batsman] = Number(game.batsman_runs);
        }
      }
    }
  });
  let sortable = [];
  for (let season in result) {
    sortable = [];
    for (let batsman in result[season]) {
      sortable.push([batsman, result[season][batsman]]);
      sortable.sort((a, b) => {
        return a[1] - b[1];
      });
    }
    result[season] = {};
  }

  sortable.sort((a, b) => {
    return a[1] - b[1];
  });
  //   console.log(sortable);
  //   let count = 1;
  //   for (let item of sortable) {
  //     if (count <= 10) {
  //       finalResult.push({ batsman: item[0], runs: item[1] });
  //     } else break;
  //     count++;
  //   }
  //   console.log(finalResult);
  //   return finalResult;
}
module.exports = topScorerEachYear;
