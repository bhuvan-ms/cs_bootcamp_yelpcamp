var Campground = require("../models/campground");
var Comment = require("../models/comments");

var middlewareObj = {};

//MIDDLEWARE FOR CAMPGROUND
middlewareObj.checkCampgroundOwner = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash("error", "campground not found");
			res.render("back");
			
		}else{
			
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error", "not allowed");
				res.redirect("back");
			}
			 
		}
	      });
	}else{
		res.redirect("back");
	}

}

//MIDDLEWARE FOR COMMENTS

middlewareObj.checkCommentOwner = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comments_id, function(err, foundComment){
		if(err){
			res.render("back");
		}else{
			
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error", "no permission");
				res.redirect("back");
			}
			 
		}
	      });
	}else{
		req.flash("error", "not logged in");
		res.redirect("back");
	}
}


//MIDDLEWEAR
middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){ //method from passport.js
		return next(); // if the user is authenticated then the next function is executed
	}
	req.flash("error", "should be logged in..");
	res.redirect("/login");
}


module.exports = middlewareObj
