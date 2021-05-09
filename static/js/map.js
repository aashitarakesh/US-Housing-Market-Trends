// Create map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
}); // ends map object

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "light-v10",
    accessToken: API_KEY
}).addTo(myMap); // ends lightmap


// // Grab data with d3
d3.json("/data/map").then(function(data, err) {
  if (err) throw err;
  console.log(data);

  // geojson = L.choropleth(data[0]).addTo(myMap);
  // CHOROPLETH
  geojson = L.choropleth(data[0], {

    // Define what property in features to use
    valueProperty: "median_sale_price", 

    // Set colors
    colors: ['#f3e79b', '#e0d09e', '#ccbaa1', '#b8a4a3', 
      '#a38fa4', '#8e7aa5', '#7666a5', '#5c53a5'],

    // # of breaks in step range
    steps: 8,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.8,
    }, // ends style 

    // Bind a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.name + "</h3><hr><p>" + 
      "Median Sale Price: $" + feature.properties.median_sale_price + "</p><br><p>" + 
      "Median Price/Square Foot: $" + feature.properties.median_sale_ppsf + "</p><br><p>" +
      "Total Inventory" + feature.properties.inventory + "</p>");
    } // Ends pop-up binding of data 
  }).addTo(myMap); // ends geojson layer

  // Create legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // add in min & max
    var legendInfo = "<h1>Median Home Sale Price</h1>" + 
    "<div class=\"labels\">" +
    "<div class=\"min\">" + limits[0] + "</div>" +
    "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  }; // ends legend

  // adds legend to map
  legend.addTo(myMap);
  
}); // ends GET request



// // getColor function depending on mean house price value
// function getColor(i) {
//   return i > 100000 ? '#5c53a5' :
//          i > 200000 ? '#7666a5' :
//          i > 300000 ? '#8e7aa5' :
//          i > 400000 ? '#a38fa4' :
//          i > 500000 ? '#b8a4a3' :
//          i > 600000 ? '#ccbaa1' :
//          i > 700000 ? '#e0d09e' :
//                 '#f3e79b';
// } // ends getColor function


