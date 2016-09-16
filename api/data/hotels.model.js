var mongoose = require("mongoose");

var roomSchema = new mongoose.Schema({
	type: String,
	number: Number,
	description: String,
	photos: [String],
	price: Number
	
});

var reviewSchema = new mongoose.Schema({
	name: {
        type : String,
        required: true
    },
	review: {
        type: String,
        required : true
    },
	rating: {
        type : Number,
        required: true,
        min : 0,
        max : 5
    },
    createdon: {
        type: Date,
        "default": Date.now
    }	
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
			index: "2dsphere"
		}
	},
	reviews: [reviewSchema],
	services: [String]
	
});

mongoose.model("Hotel", hotelSchema);