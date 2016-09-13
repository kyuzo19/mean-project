var mongoose = require("mongoose");
var Hotel = mongoose.model("Hotel");


module.exports.reviewsGetAll = function (req, res) {
	var ctrlId = req.params.ctrlId;
	Hotel	
		.findById(ctrlId)
		.select("reviews")
		.exec( function (err, doc) {
			console.log("returned doc", doc);
			res
				.status(200)
				.json(doc.reviews)
		})
 };

module.exports.reviewsGetOne = function (req, res) {
	var ctrlId = req.params.ctrlId;
	var reviewId = req.params.reviewId;
	console.log("Get reviewid " + reviewId + "for ctrl id " + ctrlId);
	
		Hotel	
		.findById(ctrlId)
		.select("reviews")
		.exec( function (err, doc) {
			console.log("returned doc", doc);
			var review = doc.reviews.id(reviewId);
			res
				.status(200)
				.json(review)
		})
};