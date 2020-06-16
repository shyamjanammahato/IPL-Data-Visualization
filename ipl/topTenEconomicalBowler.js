function topTenEconomicalBowler(matches, deliveries) {
  let finalResult = {};
  let result = {};

  matches.map((match) => {
    for (let game of deliveries) {
      if (match.id == game.match_id) {
        if (result[match.season]) {
          if (result[match.season][game.bowler]) {
            result[match.season][game.bowler]["runsConceded"] += Number(
              game.total_runs
            );
            if (Number(game.noball_runs) == 0 && Number(game.wide_runs) == 0)
              result[match.season][game.bowler]["bowls"] += 1;
          } else {
            result[match.season][game.bowler] = {};
            if (Number(game.noball_runs) == 0 && Number(game.wide_runs) == 0)
              result[match.season][game.bowler]["bowls"] = 1;
            else result[match.season][game.bowler]["bowls"] = 0;
            result[match.season][game.bowler]["runsConceded"] = Number(
              game.total_runs
            );
          }
        } else {
          result[match.season] = {};
        }
      }
    }
  });
  // calculating economy rate and sorting by pushing values into an array
  for (let season in result) {
    let sortable = [];
    for (let bowler in result[season]) {
      let economy = (
        result[season][bowler].runsConceded /
        (result[season][bowler].bowls / 6)
      ).toFixed(2);
      //pushing to array to be sorted
      sortable.push([bowler, economy]);
    }
    //sorting
    sortable.sort((a, b) => {
      return a[1] - b[1];
    });
    // after sorting taking the result into another object season wise
    for (let item of sortable) {
      if (finalResult[season]) {
        finalResult[season][item[0]] = item[1];
      } else {
        finalResult[season] = {};
        finalResult[season][item[0]] = item[1];
      }
    }
  }
  // taking top ten values of each season
  const topTen = {};
  let count = 1;
  for (let season in finalResult) {
    count = 1;
    for (let item in finalResult[season]) {
      if (topTen[season]) {
        if (count < 10) {
          topTen[season][item] = parseFloat(finalResult[season][item]);
        } else break;
        count++;
      } else {
        topTen[season] = {};
        topTen[season][item] = parseFloat(finalResult[season][item]);
      }
    }
  }
  return topTen;
}
module.exports = topTenEconomicalBowler;
