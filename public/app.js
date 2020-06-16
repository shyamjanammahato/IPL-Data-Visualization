function fetchAndVisualizeData() {
  fetch("./data.json")
    .then((r) => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonPerTeam(data.matchesWonPerTeam);
  // visualizeRunsConcededPerTeam(data.runsConcededPerTeam); // 2016
  // visualizetopTenEconomicalBowler(data.topTenEconomicalBowler); //2015
  visualizematchesWonPerVenue(data.matchesWonPerVenue);
  visualizetopTenScorer(data.topTenScorer); // 2019
  return;
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
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

function visualizeRunsConcededPerTeam(runsConcededPerTeam, season) {
  const seriesData = [];
  for (let team in runsConcededPerTeam) {
    seriesData.push([team, runsConcededPerTeam[team]]);
  }
  Highcharts.chart("extra-runs-per-team-in-2016", {
    chart: {
      type: "column",
    },
    title: {
      text: "Extra Runs Conceded By Each Team In " + season,
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

function visualizetopTenEconomicalBowler(topTenEconomicalBowler, season) {
  const seriesData = [];
  Object.entries(topTenEconomicalBowler).map((key, value) => {
    seriesData.push(key);
  });
  Highcharts.chart("top-10-economical-bowler-in-2015", {
    chart: {
      type: "column",
    },
    title: {
      text: "Top Economical Bowlers in " + season,
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

function visualizetopTenScorer(topTenScorer) {
  const seriesData = [];
  Object.values(topTenScorer).map((entry) =>
    seriesData.push([entry.batsman, Number(entry.runs)])
  );
  Highcharts.chart("top-ten-scorer-in-2019", {
    chart: {
      type: "column",
    },
    title: {
      text: "Top 10 Scorer in 2019 Season",
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
        name: "Runs",
        data: seriesData,
      },
    ],
  });
}

function showExtraRuns() {
  let season = document.getElementById("season").value;
  if (season == 0) {
    alert("Please select season.");
  } else {
    fetch("/extraruns?year=" + season)
      .then((response) => response.json())
      .then((json) => {
        visualizeRunsConcededPerTeam(json, season);
      });
  }
}

function showEconomicalBowler() {
  let season = document.getElementById("bowler_season").value;
  if (season == 0) {
    alert("Please select season.");
  } else {
    fetch("/economy?year=" + season)
      .then((response) => response.json())
      .then((json) => {
        visualizetopTenEconomicalBowler(json, season);
      });
  }
}
