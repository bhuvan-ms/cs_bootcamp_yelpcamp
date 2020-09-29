//schema setup
var mongoose = require("mongoose");
var campgroundsSchema = new mongoose.Schema({
	name:String,
	price:String,
	image:String,
	description : String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"User"
		}
	},
	comments : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref	: "Comment"
		}
	]
});

module.exports = mongoose.model("Campground",campgroundsSchema); // module.exports is to export the data to app.js page