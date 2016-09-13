
/*var dbconn = require("../data/dbconnections.js");
var objectId = require("mongodb").ObjectId;
var ctrlData = require('../data/hotel-data.json');*/
var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");

var runGeoQuery = function (req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};

	var geoOptions = {
		spherical : true,
		maxDistance : 2000,
		num : 5
	};

	Hotel
		.geoNear(point, geoOptions, function (err, results, stats) {
		console.log("Geo results", results);
		console.log("Geo stats", stats);
		res 
			.status(200)
			.json(results);
	});
	
};

module.exports.getAll = function(req, res) {
	/*var db = dbconn.get();
	var collection = db.collection("hotel");
	*/
	var offset = 0;
	var count = 5;
	
	if (req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req,res)
		return;
	}

	if (req.query && req.query.offset) {
    	offset = parseInt(req.query.offset, 10);
	}
  
  	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}
	
	Hotel	
		.find()
		.exec(function (err, hotels) {
		console.log("Hotel length: ", hotels.length);
		res
			.json(hotels)
	});
	
	/*collection
		.find()
		.skip(offset)
		.limit(count)
		.toArray(function (err, docs) {
			console.log("found hotels", docs);
		res
			.status(200)
			.json(docs);
		});
	*/
	
	/*console.log("db connection open at controller",  db);
  	console.log('GET the data from ctrl');
  	console.log(req.query);

  var returnData;
 

  returnData = ctrlData.slice(offset,offset+count);

  res
    .status(200)
    .json(returnData);*/
};

module.exports.getOne = function(req, res) {
	/*var db = dbconn.get();
	var collection = db.collection("hotel");*/
	
	var ctrlId = req.params.ctrlId;
	console.log('GET hotelId', req.params.ctrlId);
	
	Hotel	
		.findById(ctrlId)
		.exec( function (err, doc) {
			res
				.status(200)
				.json(doc)
		})
	
	/*collection
		.findOne({
		_id : objectId(ctrlId)
	}, function (err, doc) {
			res
  	  			.status(200)
				.json( doc );
		});
	*/
  	
};

module.exports.addOne = function(req, res) {
	var db = dbconn.get();
	var collection = db.collection("hotel");
	var  Hotel;
	
	if (req.body && req.body.name && req.body.stars) {
		
		var Hotel = req.body;
		Hotel.stars = parseInt(req.body.stars, 10);
		collection.insertOne(Hotel, function (err, response) {
			console.log(response);
			console.log(response.ops);
			res 
    		.status(201)
    		.json(response.ops);
		});
		console.log(req.body);
 	
	} else {
		console.log("data missing from body");
		res
			.status(400)
			.json({ message : "required data missing from body"})
	}
  console.log("POST new hotel");
  
};