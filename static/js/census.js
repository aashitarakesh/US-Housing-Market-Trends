d3.json("/data/census").then(function(data){
    console.log("Retriving census age");
    console.log(data)

    const ageDataset = data[0];
    const raceDataset = data[1];


    var dropdown = d3.select("#selDataset");

    var names = ageDataset.geographies;

    names.forEach(function(name){
        var option = dropdown.append("option");
        option.text(name);
    });

    buildAgeTree("United States")
    buildRaceTree("United States")

    // buildAgeTree()
    // buildRaceTree()

    dropdown.on("change", function(){
        var ID = dropdown.property("value");
        console.log(ID)
        buildAgeTree(ID)
        buildRaceTree(ID)
    });

    // *****************
    // tree map building functions
    // *****************
    function buildAgeTree(selection){

        var dataSelection = ageDataset.data[selection];

        var labels = [ 
            "<35 year old owners", 
            "35-44 year old owners", 
            "45-54 year old owners", 
            "55-64 year old owners", 
            "65-74 year old owners", 
            "75-84 year old owners", 
            ">85 year old owners", 
            "<35 year old renters", 
            "35-44 year old renters", 
            "45-54 year old renters", 
            "55-64 year old renters", 
            "65-74 year old renters", 
            "75-84 year old renters", 
            ">85 year old renters",
            "owner-occupied", 
            "renter-occupied"
        ];
        var parents = [
            "owner-occupied", 
            "owner-occupied", 
            "owner-occupied", 
            "owner-occupied", 
            "owner-occupied", 
            "owner-occupied", 
            "owner-occupied",  
            "renter-occupied",
            "renter-occupied",
            "renter-occupied",
            "renter-occupied",
            "renter-occupied",
            "renter-occupied",
            "renter-occupied",
            "",
            ""
        ];
        var data = [{
            type: "treemap",
            branchvalues: "total",
            labels: labels,
            parents: parents,
            values:  dataSelection,
            textinfo: "label+value+percent parent+percent entry text",
            outsidetextfont: {"size": 20, "color": "#377eb8"},
            marker: {"line": {"width": 2},
                    colors: ['#d2fbd4','#a5dbc2','#7bbcb0','#559c9e','#3a7c89','#235d72','#123f5a','#d2fbd4','#a5dbc2','#7bbcb0','#559c9e','#3a7c89','#235d72','#123f5a',
                    "#3b738f","#2a5674"]},
            pathbar: {"visible": false}
            }];

            // '#d2fbd4','#a5dbc2','#7bbcb0','#559c9e','#3a7c89','#235d72','#123f5a','#d2fbd4','#a5dbc2','#7bbcb0','#559c9e','#3a7c89','#235d72','#123f5a',
        
        var layout = {
            title: "Homeowners vs Renters - by Age"
        };

        Plotly.newPlot('census_age', data, layout);


    };
            
    function buildRaceTree(selection){

        var dataSelection = raceDataset.data[selection]
        var labels = raceDataset.labels
        var ow = labels[16]
        var re = labels[17]
        var parents = [ow,ow,ow,ow,ow,ow,ow,ow,re,re,re,re,re,re,re,re,"",""]

        var data = [{
            type: "treemap",
            branchvalues: "total",
            labels: labels,
            parents: parents,
            values:  dataSelection,
            textinfo: "label+value+percent parent+percent entry text",
            outsidetextfont: {"size": 20, "color": "#377eb8"},
            marker: {"line": {"width": 2},
            colors: ['#d2fbd4','#a5dbc2','#7bbcb0','#559c9e','#3a7c89','#235d72','#0d585f','#123f5a','#d2fbd4','#a5dbc2','#7bbcb0','#559c9e','#3a7c89','#235d72','#0d585f','#123f5a',
            "#3b738f","#2a5674"]},
            pathbar: {"visible": false}
            }];
        
        var layout = {
            title: "Homeowners vs Renters - by Race"
        };

        Plotly.newPlot('census_race', data, layout);


    }
});