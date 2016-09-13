var mongoose = require("mongoose");

var roomSchema = new mongoose.Schema({
	type: String,
	number: Number,
	description: String,
	photos: [String],
	price: Number
	
});

var reviewSchema = new mongoose.Schema({
	name: String,
	id: String,
	review: String,
	rating: Number
	
});

var hotelSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	stars : {
		type : Number,
		min : 0,
		max: 5,
		default : 0
	},
	services : [String],
	description : String,
	photos : [String],
	currency : String,
    rooms: [roomSchema],
	location: {
		address: String,
		coordinates: {
			type: [Number],
			//longitude e/w latitude  n/s
			index: "2sphere"
		}
	},
	reviews: [reviewSchema],
	services: [String]
	
});

mongoose.model("Hotel", hotelSchema);