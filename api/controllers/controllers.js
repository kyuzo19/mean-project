
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
	var collection = db.collection("hotel");*/                                                  console.log("get all hotels");                                                                                                                                                            var offset = 0;
	var count = 5;
    var maxCount = 10;
 
	if (req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req, res)
		return;
	}

	if (req.query && req.query.offset) {
    	offset = parseInt(req.query.offset, 10);
	}
  
  	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}
	
	if (isNaN(offset) || isNaN(count)) {
		res
			.status(400)
			.json({
				"message" : "if supplied in query string count and offset should be"
			});
		return;
	}
	
	if (count > maxCount) {
		res
			.status(400)
			.json({
				"message" : "count limit of " + maxCount + " exceeeded"
			});
	}
	
	Hotel	
		.find()
		.skip(offset)
		.limit(count)
		.exec(function (err, hotels) {
		
			if (err) {
				console.log("error findings hotels");
				res
					.status(500)
					.json(err);
			} else {
				console.log("Hotel length: ", hotels.length);
				res
					.json(hotels)
			}	
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
			var response = {
				status : 200,
				message : doc
			}
		
			if (err) {
				console.log("error findings hotels");
				response.status = 500;
				response.message = err;
					
			} else if (!doc) {
				response.status = 404;
				response.message = {
						"message" : "hotel id not found"
					};
			}  
				res
					.status(response.status)
					.json(response.message);
			
			
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

//helper function
var _splitArray = function (input) {
	var output;
	if (input && input.length > 0) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
}

module.exports.addOne = function(req, res) {
	/*var db = dbconn.get();
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
  console.log("POST new hotel");*/
  
	Hotel
		.create({
			name: req.body.name,
			description: req.body.description,
			stars : parseInt(req.body.stars, 10),
			services : req.body.services,
			photos : req.body.photos,
			currency : req.body.currency,
			location : {
				address : req.body.address,
				coordinates : [
					parseFloat(req.body.lng), parseFloat(req.body.lat)
				]
			}
			
		}, function (err, hotel) {
			if (err) {
				console.log("error creating hotel");
				res
					.status(400)
					.json(err)
			}	else {
				console.log("hotel created", hotel );
				res
					.status(201)
					.json(hotel);
			}
		})
};