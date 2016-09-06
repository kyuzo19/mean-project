var MongoClient = require("mongodb").MongoClient;
var dburl = "mongodb://localhost:2701/mean";

var _connection = null;
var open = function () {
	MongoClient.connect(dburl, function (err, db) {
		if (err) {
			console.log("Connecting to database failed");
			return;
		};
		_connection = db;
		console.log("Db connection open" , db);
	});
	//connection
};

var get = function () {
	return _connection;
};

module.exports = {
	open : open,
	get : get
}

