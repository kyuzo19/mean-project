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

var _addReview = function (req, res, hotel) {
	
	hotel.reviews.push({
		name: req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});
	
	hotel.save(function (err, hotelUpadated) {
		if (err) {
			res	
				.status(500)
				.json(err);
		} else {
			res
				.status(201)
				.json(hotelUpadated.reviews[hotelUpadated.reviews.length - 1])
		}
	});
	
};

module.exports.reviewAddOne = function (req, res) {
	 
	var ctrlId = req.params.ctrlId;
	Hotel	
		.findById(ctrlId)
		.select("reviews")
		.exec( function (err, doc) {
			console.log("returned doc", doc);
			
			var response = {
				status : 200,
				message : []
			};
			
			if (err) {
				response.status = 500;
				response.message = err;
				
			} else if (!doc) {
				response.status = 404;
				response.message = {
					"message" : "hotel "
				}
			}
			if (doc) {
				_addReview(req, res, doc);
			}
			else {
				res
				.status(response.status)
				.json(response.message);
				
			}	
		
		});

	
};

module.exports.deleteOneReview = function (req, res) {
	var ctrlId = req.params.ctrlId;
	var reviewId = req.params.reviewId;
	console.log("PUT reviewID " + reviewId + " for ctrlId " + ctrlId);
	
	Hotel	
		.findById(ctrlId)
		.select("reviews")
		.exec(function (err, hotel) {
			var thisReview;
			var response = {
				status: 200,
				message : {}
			};
		console.log(hotel);
		if (err) {
			response.status = 500;
			response.message = err;
		} 
		hotel.reviews.id(reviewId).remove();
		hotel.save(function (err, hotelUpdated) {
			if(err) {
				res	
					.status(500)
					.json(err)
			} else {
				res	
					.status(204)
					.json()
			}
		});
		
		
	/*	if (err) {
			response.status = 500;
			response.message = err;
		} else if (!hotel) {
			response.status = 404;
			response.message = {
				"message" : "hotel ID not found " + id
			};
		} else {
			thisReview = hotel.review.id(reviewId);
			
			if (!thisReview) {
				response.status = 404;
				response.message = {
					"message" : "Review ID not found" + reviewId
				};
			}
		}
		if ( response.status !== 200) {
			res
				.status(response.status)
				.json(response.message)
		
		} else {
			hotel.reviews._id(reviewId).remove();
			hotel.save(function (err, hotelUpdated) {
				if(err) {
					res	
						.status(500)
						.json(er)
				} else {
					res	
						.status(204)
						.json()
				}
			});
		}*/
		});
};