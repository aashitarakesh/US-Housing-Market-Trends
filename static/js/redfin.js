// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");
  
    // clear svg is not empty
    if (!svgArea.empty()) {
      svgArea.remove();
    }
  
// SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 80
    };

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "median_sale_price";
var chosenYAxis = "inventory";

// // // function used for updating x-scale var upon click on axis label
function xScale(housingData, chosenXAxis) {
    // create scales
    // var xLogScale = d3.scaleLinear()
      var xLogScale = d3.scaleLog()
       .domain([d3.min(housingData, d => d[chosenXAxis]),
        d3.max(housingData, d => d[chosenXAxis]) 
      ])
      .range([0, width]);
  
    return xLogScale;
  
  }

  // function used for updating y-scale var upon click on axis label
  function yScale(housingData, chosenYAxis) {
    // create scales
    // var yLogScale = d3.scaleLinear()
    var yLogScale = d3.scaleLog()
      .domain([d3.min(housingData, d => d[chosenYAxis]),
        d3.max(housingData, d => d[chosenYAxis])
      ])
      .range([height, 0]);
  
    return yLogScale;
  
  }

  // // function used for updating xAxis var upon click on axis label
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

  // function used for updating yAxis var upon click on axis label
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }

  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }

  // function used for updating circle text with a transition to
 // new circle text
 function renderText(textGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

    textGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]));
      
  
    return textGroup;
  }
 // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, chosenYAxis,circlesGroup) {

    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        if (chosenXAxis === "median_sale_price"){
          return (`${d.region_name}<br>${chosenXAxis}: $${d[chosenXAxis]} <br>${chosenYAxis}: ${d[chosenYAxis]}`); 
      
        }    
        else {
          return (`${d.region_name}<br>${chosenXAxis}: ${d[chosenXAxis]} <br>${chosenYAxis}: ${d[chosenYAxis]}`);  
        }
        });
        
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data,this);
      })
      // onmouseout event
     .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }
  
 //read in json data
  d3.json("/data/housing").then(function(housingData, err) {
     if (err) throw err;
     console.log(housingData)
  
    // Parse Data/Cast as numbers
    housingData.forEach(function(data) {
      data.median_sale_price = +data.median_sale_price;
      data.price_drops = +data.price_drops;
      data.inventory = +data.inventory;
      data.median_days_on_market = +data.median_days_on_market;
    });
    
    // xLogScale function 
    var xLogScale = xScale(housingData, chosenXAxis);
  
    // yLogScale function 
    var yLogScale = yScale(housingData, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLogScale);
    var leftAxis = d3.axisLeft(yLogScale);

    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

   // append y axis
   var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);


    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
       .data(housingData)
       .enter()
       .append("circle")
       .attr("cx", d => xLogScale(d[chosenXAxis]))
       .attr("cy", d => yLogScale(d[chosenYAxis]))
       .attr("r", "15")
       .attr("fill", "rgba(128, 14, 156, 1)")
      //  .attr("class", "region_nameCircle")
      .attr("opacity", ".5");

    // append initial text
    var textGroup = chartGroup.selectAll("text")
       .exit()
       .data(housingData)
       .enter()
       .append("text")
      //  .text(d => d.state)
       .attr("x", d => xLogScale(d[chosenXAxis]))
       .attr("y", d => yLogScale(d[chosenYAxis]))
       .attr("class", "region_nameText")

      
      // Create group for x-axis labels
     var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`)


    var salePriceLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "median_sale_price") // value to grab for event listener
    .classed("active", true)
    .classed("aText", true)
    .text("Median Sale Price ($)");

    var priceDropLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "price_drops") // value to grab for event listener
    .classed("inactive", true)
    .classed("aText", true)
    .text("Price Drops");

    // Create group for y-axis labels
     var ylabelsGroup = chartGroup.append("g")
         .attr("transform", `translate(${0-margin.left/2},${height/2})`);

    var inventoryLabel = ylabelsGroup.append("text")
       .attr("x", 0)
       .attr("y", -24)
       .attr("transform", "rotate(-90)")
       .attr("dy", "1em")
       .attr("value", "inventory") // value to grab for event listener
       .classed("active", true)
       .classed("aText", true)
       .text("Inventory");

    var marketDaysLabel = ylabelsGroup.append("text")
       .attr("x", 0)
       .attr("y", -44)
       .attr("transform", "rotate(-90)")
       .attr("dy", "1em")
       .attr("value", "median_days_on_market") // value to grab for event listener
       .classed("inactive", true)
       .classed("aText", true)
       .text("Median Days On Market");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
     .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

    //     // replaces chosenXAxis with value
        chosenXAxis = value;
        console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLogScale = xScale(housingData, chosenXAxis);
        // updates y scale for new data
        yLogScale = yScale(housingData, chosenYAxis);

    //     // updates x axis with transition
        xAxis = renderXAxes(xLogScale, xAxis);

    //     // updates circles with new values
        circlesGroup = renderCircles(circlesGroup, xLogScale,yLogScale, chosenXAxis,chosenYAxis);

    //     // updates texts with new values
        textGroup = renderText(textGroup, xLogScale, yLogScale, chosenXAxis, chosenYAxis);

    //      // updates tooltips with new info
         circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "median_sale_price") {
            salePriceLabel
              .classed("active", true)
              .classed("inactive", false);
            priceDropLabel
              .classed("active", false)
              .classed("inactive", true);
          }
        else {
            salePriceLabel
              .classed("active", false)
              .classed("inactive", true);
            priceDropLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
      
    // y axis labels event listener
    ylabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
    var value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

        // replaces chosenYAxis with value
         chosenYAxis = value;
         console.log(chosenYAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLogScale = xScale(housingData, chosenXAxis);
        // updates y scale for new data
         yLogScale = yScale(housingData, chosenYAxis);

        // updates y axis with transition
        yAxis = renderYAxes(yLogScale, yAxis);

        // updates circles with new values
        circlesGroup = renderCircles(circlesGroup, xLogScale,yLogScale, chosenXAxis,chosenYAxis);

        // updates texts with new values
        textGroup = renderText(textGroup, xLogScale, yLogScale, chosenXAxis, chosenYAxis);

         // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "inventory") {
            inventoryLabel
              .classed("active", true)
              .classed("inactive", false);
            marketDaysLabel
              .classed("active", false)
              .classed("inactive", true);
        }
        else {
            inventoryLabel
              .classed("active", false)
              .classed("inactive", true);
            marketDaysLabel
              .classed("active", true)
              .classed("inactive", false);
          }
    }
    });
  })
  .catch(function(error) {
    console.log(error);
  });
}
  // When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);