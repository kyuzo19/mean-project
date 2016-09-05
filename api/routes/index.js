var express = require("express");
var router = express.Router();
var ctrl = require("../controllers/controllers.js");

router
	.route("/ctrl")
	.get(ctrl.getAll)
	.post(function (req, res) {
		console.log("post json route");
		res
			.status(200)
			.json({"jsonData": "post received"});
	});
router
	.route("/ctrl/:ctrlId")
	.get(ctrl.getOne);

router	
	.route("/ctrl/new")
	.post(ctrl.addOne);

module.exports = router;