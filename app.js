require("./instantHello");
var goodbye = require("./talk/goodbye");
var talk = require("./talk");
var question = require("./talk/question")

talk.intro();
talk.hello("kenenth");
var answer = question.ask("who am i?");
console.log(answer);
goodbye();