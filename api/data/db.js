var mongoose = require("mongoose");
var dburl = "mongodb://localhost:27017/mean";

mongoose.connect(dburl);
mongoose.connection.on("connected", function () {
	console.log("mongoose connected to: " + dburl);
});
mongoose.connection.on("disconnected", function () {
	console.log("mongoose discconnected");
});
mongoose.connection.on("error", function () {
	console.log("mongoose connected error: ");
});

process.on("SIGINT", function () {
	mongoose.connection.close(function(){
		console.log("mongoose disconnected through app termination (SIGINT)");
		process.exit(0);
	})
})