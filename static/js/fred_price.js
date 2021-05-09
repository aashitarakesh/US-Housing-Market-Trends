d3.json("/data/fred").then(function(data){
  console.log("Retriving fred data")
  console.log(data)
  var dataset = data[0]
  console.log(dataset)
  console.log(dataset.date)
  trace_lumber = {
      x : dataset.date,
      y : dataset.lumber_price_index,
      name: "lumber price index",
      type : "scatter"
  }

  trace_homeprice = {
      x : dataset.date,
      y : dataset.median_house_price,
      yaxis: 'y2',
      name: "median house price",
      type : "scatter"
  }

  trace_homeown = {
      x : dataset.date,
      y : dataset.homeownership_rate,
      yaxis: 'y3',
      name: "homeownership rate",
      type : "scatter"
  }

  var plotData = [trace_lumber,trace_homeprice,trace_homeown]

  var layout = { 
      title: "Homeownership Rate vs Median House Price vs Lumber Price Index",
      colorway : ['#f3cec9', '#a262a9', '#6f4d96'],
      width: 800,
      // xaxis: {domain: [0.2, 0.8]},
      yaxis: {
          title: trace_lumber.name,
          titlefont: {color: '#f3cec9'},
          tickfont: {color: '#f3cec9'}
        },
        yaxis2: {
          title: trace_homeprice.name,
          titlefont: {color: '#a262a9'},
          tickfont: {color: '#a262a9'},
          anchor: 'free',
          overlaying: 'y',
          side: 'left',
          position: 0.1
        },
        yaxis3: {
          title: trace_homeown.name,
          titlefont: {color: '#6f4d96'},
          tickfont: {color: '#6f4d96'},
          anchor: 'x',
          overlaying: 'y',
          side: 'right'
        }
  }

  Plotly.newPlot("fred_prices_trend", plotData, layout);

})