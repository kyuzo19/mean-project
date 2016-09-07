
var dbconn = require("../data/dbconnections.js");
var objectId = require("mongodb").ObjectId;
var ctrlData = require('../data/hotel-data.json');


module.exports.getAll = function(req, res) {
	var db = dbconn.get();
	var collection = db.collection("hotel");
	
	 var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
    	offset = parseInt(req.query.offset, 10);
	}
  
  	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	collection
		.find()
		.skip(offset)
		.limit(count)
		.toArray(function (err, docs) {
			console.log("found hotels", docs);
		res
			.status(200)
			.json(docs);
		});
	
	
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
	var db = dbconn.get();
	var collection = db.collection("hotel");
	
	var ctrlId = req.params.ctrlId;
	console.log('GET hotelId', req.params.ctrlId);
	
	collection
		.findOne({
		_id : objectId(ctrlId)
	}, function (err, doc) {
			res
  	  			.status(200)
				.json( doc );
		});
	
  	
};

module.exports.addOne = function(req, res) {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};