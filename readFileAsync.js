var fs = require("fs");

console.log("Getting file");
fs.readFile("readFileSync.js", function(err, file) {
	console.log("File recieved");
});


console.log("apps continue");