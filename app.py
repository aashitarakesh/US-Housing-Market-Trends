from flask import Flask,jsonify,render_template, redirect
from flask_pymongo import PyMongo
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/housing_db"
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/states")
def states():
    return render_template("states.html")

@app.route("/national")
def national():
    return render_template("national.html")

@app.route("/newyork")
def newyork():
    return render_template("ny_map.html")

#need to delete later will be merge with /newyork
@app.route("/redfin")
def redfin():
    return render_template("redfin.html")

@app.route("/data/census")
def census():
    data = mongo.db.census_housing_demo.find()
    json_data = list(data)
    json_data = json.dumps(json_data, default=json_util.default)
    return json_data

@app.route("/data/fred")
def fred():
    data = mongo.db.fred.find()
    json_data = list(data)
    json_data = json.dumps(json_data, default=json_util.default)
    return json_data

@app.route("/data/map")
def map():
    data = mongo.db.redfinmap.find()
    json_data = list(data)
    json_data = json.dumps(json_data, default=json_util.default)
    return json_data

@app.route("/data/housing")
def redfin_data(): 
    collection = mongo.db.housing_summary
    redfin_list=[]
    results = collection.find({}, {"_id": 0})
    for x in results:
        redfin_list.append(x)
    return jsonify(redfin_list)

# @app.route("/data/housing")
# def housing():
#     data = mongo.db.housing_summary.find()
#     json_data = list(data)
#     json_data = json.dumps(json_data, default=json_util.default)
#     return json_data

@app.route("/data/nymap")
def ny_map_data():   
    collection = mongo.db.ny_choropleth
    ny_list=[]
    results = collection.find({}, {"_id": 0})
    for x in results:
        ny_list.append(x)
    return jsonify(ny_list)

@app.route("/data/redfin")
def dataredfin():
    data = mongo.db.redfinclean.find()
    json_data = list(data)
    json_data = json.dumps(json_data, default=json_util.default)
    return json_data

if __name__ == '__main__':
    app.run(host='127.0.0.1', threaded=True)