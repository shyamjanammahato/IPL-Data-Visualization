function fetchAndVisualizeData() {
  fetch("./data.json")
    .then((r) => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonPerTeam(data.matchesWonPerTeam);
  visualizeRunsConcededPerTeam(data.runsConcededPerTeam);
  visualizetopTenEconomicalBowler(data.topTenEconomicalBowler);
  visualizematchesWonPerVenue(data.matchesWonPerVenue);
  // visualizetopScorerEachYear(data.topScorerEachYear);
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  console.log(seriesData);
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column",
    },
    title: {
      text: "Matches Played Per Year",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    series: [
      {
        name: "Matches",
        data: seriesData,
      },
    ],
  });
}

function visualizeMatchesWonPerTeam(matchesWonPerTeam) {
  const finalResult = [];
  const team = [];
  const season = Object.keys(matchesWonPerTeam).map((season) => season);

  for (let i = 0; i < season.length; i++) {
    team.push(Object.keys(matchesWonPerTeam[season[i]]));
  }

  const teams = [...new Set([].concat.apply([], team))];

  for (let i in teams) {
    let tempArr = [];
    for (let j in season) {
      if (matchesWonPerTeam[season[j]].hasOwnProperty(teams[i]))
        tempArr.push(matchesWonPerTeam[season[j]][teams[i]]);
      else tempArr.push(0);
    }
    finalResult.push({ name: teams[i], data: tempArr });
  }
  Highcharts.chart("matches-won-per-team", {
    chart: {
      type: "column",
    },
    title: {
      text: "Number of matches won by each team over all the years of IPL",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      categories: season,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches Won",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: finalResult,
  });
}

function visualizeRunsConcededPerTeam(runsConcededPerTeam) {
  const seriesData = [];
  for (let team in runsConcededPerTeam) {
    seriesData.push([team, runsConcededPerTeam[team]]);
  }

  Highcharts.chart("extra-runs-per-team-in-2016", {
    chart: {
      type: "column",
    },
    title: {
      text: "Runs Conceded By Each Team In 2016",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Runs",
      },
    },
    series: [
      {
        name: "Extra Runs",
        data: seriesData,
      },
    ],
  });
}

function visualizetopTenEconomicalBowler(topTenEconomicalBowler) {
  const seriesData = [];
  Object.values(topTenEconomicalBowler).map((entry) =>
    seriesData.push([entry.bowler, Number(entry.economy)])
  );
  Highcharts.chart("top-10-economical-bowler-in-2015", {
    chart: {
      type: "column",
    },
    title: {
      text: "Top Economical Bowlers in 2015 Season",
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy Rate",
      },
    },
    series: [
      {
        name: "Economy Rate",
        data: seriesData,
      },
    ],
  });
}

function visualizematchesWonPerVenue(matchesWonPerVenue) {
  const finalResult = [];
  const team = [];
  const venues = Object.keys(matchesWonPerVenue);

  for (let i = 0; i < venues.length; i++) {
    team.push(Object.keys(matchesWonPerVenue[venues[i]]));
  }
  const teams = [...new Set([].concat.apply([], team))];
  for (let i in teams) {
    let tempArr = [];
    for (let j in venues) {
      if (matchesWonPerVenue[venues[j]].hasOwnProperty(teams[i]))
        tempArr.push(matchesWonPerVenue[venues[j]][teams[i]]);
      else tempArr.push(0);
    }
    finalResult.push({ name: teams[i], data: tempArr });
  }
  console.log(venues);
  console.log(finalResult);
  Highcharts.chart("matches-won-by-each-team-per-venue", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Matches Won By Each Team Per Venue",
    },
    xAxis: {
      categories: venues,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches won vs stadium",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series: finalResult,
  });
}

// function visualizetopScorerEachYear(topScorerEachYear) {
//   const seriesData = [];
//   Object.keys(topScorerEachYear).map((season) => {
//     seriesData.push([Number(season), topScorerEachYear[season]]);
//   });

//   console.log(seriesData);
//   Highcharts.chart("top-scorer-over-all-season", {
//     chart: {
//       type: "column",
//     },
//     title: {
//       text: "Top Economical Bowlers in 2015 Season",
//     },
//     subtitle: {
//       text:
//         'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
//     },
//     xAxis: {
//       type: "category",
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: "Runs",
//       },
//     },
//     series: [
//       {
//         name: "Runs",
//         data: seriesData,
//       },
//     ],
//   });
// }
