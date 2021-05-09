d3.json("/data/redfin").then(function(data){
  console.log("redfin data is here")
  console.log(data)
  var redfindata = data[0]
    console.log(redfindata)
  

  years = redfindata.years  
  totalhomessold = redfindata.data['US'].total_homes_sold,
  mediansaleprice = redfindata.data['US'].median_sale_price
  console.log(years)
  console.log(totalhomessold)
  console.log(mediansaleprice)

  // Trace1 for the total homes sold
  var trace1 = {
    x: years,
    y: totalhomessold ,
    name: "Total Homes Sold",
    type: "bar"
  };
  
  // Trace 2 for the median Data
  var trace2 = {
    x: years,
    y: mediansaleprice,
    yaxis: "y2",
    name: "Median House Price",
    type: "scatter"
  };
  
  // Combining both traces
  var traceData = [trace1, trace2];
  
  // Apply the group barmode to the layout
  var layout = {
    title: "Total Homes Sold versus Median Price",
    pattern: "independent"
  };

  var layout = { 
    title: "fred test",
    // colorway : ['#f3cec9', '#a262a9', '#6f4d96'],
    yaxis: {
        title: trace1.name,
        titlefont: {color: 'blue'},
        tickfont: {color: 'blue'}
      },
      yaxis2: {
        title: trace2.name,
        titlefont: {color: 'orange'},
        tickfont: {color: 'orange'},
        // anchor: 'free',
        overlaying: 'y',
        side: 'right',
        // position: 0.15
      }
}
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", traceData, layout);
 })