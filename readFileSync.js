var fs = require("fs");

console.log("Getting file");
var file = fs.readFileSync("readFileSync.js");
console.log("File recieved");

console.log("apps continue");