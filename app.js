require("./instantHello");
var goodbye = require("./talk/goodbye");
var talk = require("./talk");
var question = require("./talk/question")

talk.intro();
talk.hello("kenenth");
var answer = question.ask("who am i?");
console.log(answer);
goodbye();

/*express*/
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");



var routes = require("./api/routes");

app.set("port", 3000);

app.use(function (req, res, next) {
	console.log(req.method, req.url);
	next();
});

/*middleware*/
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);
/*
app.get("/", function (req, res) {
	console.log("get homepage");
	res
		.status(200)
		.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

app.get("/json", function (req, res) {
	console.log("get json");
	res
		.status(200)
		.json({"jsonData": true});			
});
app.get("/file", function (req, res) {
	console.log("get file");
	res
		.status(200)
		.sendFile(path.join(__dirname, "app.js"));			
});
/*listen asynchronous*/
var server = app.listen(app.get("port"), function () {
	var port = server.address().port
	console.log("listening to port " + app.get("port"));
	console.log("listening to port " + port);
});

console.log("run this first");

