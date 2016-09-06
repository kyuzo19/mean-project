
var dbconn = require("../data/dbconnections.js");
var ctrlData = require('../data/hotel-data.json');

module.exports.getAll = function(req, res) {
	var db = dbconn.get();
	console.log("db connection open at controller",  db);
  console.log('GET the data from ctrl');
  console.log(req.query);

  var returnData;
  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  returnData = ctrlData.slice(offset,offset+count);

  res
    .status(200)
    .json(returnData);
};

module.exports.getOne = function(req, res) {
  console.log('GET hotelId', req.params.ctrlId);
  res
    .status(200)
    .json(ctrlData[req.params.ctrlId]);
};

module.exports.addOne = function(req, res) {
  console.log("POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};