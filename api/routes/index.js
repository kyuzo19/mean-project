var express = require("express");
var router = express.Router();
var ctrl = require("../controllers/controllers.js");
var  ctrlReviews = require("../controllers/review.ctrl.js")

router
	.route("/ctrl")
	.get(ctrl.getAll)
	.post(ctrl.addOne);
router
	.route("/ctrl/:ctrlId")
	.get(ctrl.getOne);

router	
	.route("/ctrl/new")
	.post(ctrl.addOne);
router
	.route("/ctrl/:ctrlId/reviews")
	.get(ctrlReviews.reviewsGetAll)
	.post(ctrlReviews.reviewAddOne)

router
	.route("/ctrl/:ctrlId/reviews/:reviewId")
	.get(ctrlReviews.reviewsGetOne);

module.exports = router;