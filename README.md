# US-Housing-Market-Trends
Analyze the US Housing Market

### Required Libraries

* pandas

* numpy

* census wrapper:
https://github.com/datamade/census

* fred wrapper:
https://github.com/mortada/fredapi

* pymongo



### Required files

requires a file called ```config.py``` within the ETL directory containing API keys. The config file needs to be of the format: 

        census_key = "your census api key"

        fred_key = "your fred api key"
        
        


requires a file called ```config.js``` within the static/js directory containing API key for Mapbox. The config file needs to be of the format: 

        API_KEY = "your mapbox api key"



### Data sources

* Census & FRED sources are sited in respective Jupyter Notebook ETL's

* Redfin:
https://www.redfin.com/news/data-center/

* County geojson:
https://eric.clst.org/tech/usgeojson/

* State geojson:
https://leafletjs.com/examples/choropleth/us-states.js

* NewYork Counties geojson:
https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/new-york-counties.geojson


