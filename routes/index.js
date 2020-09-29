var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res){ //root page
	res.render("landing");
});


	


//AUTH routes
//show register forma
router.get("/register", function(req, res){
	res.render("register");
});

//signup route
router.post("/register", function(req, res){
	var newUser = new User({username : req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){ // will log the user in and take care of everything
		req.flash("success", "welcome to yelpcome" + user.username);
		});
	});
});

//show login form
router.get("/login", function(req, res){
	
	res.render("login");
});

//handle login
router.post("/login",passport.authenticate("local",
	{                                             //Middlewear setup for login route
	successRedirect : "/campgrounds",         //will find the user if exist in database and log them in
	failureRedirect : "/login"
}), function(req, res){
	
});

//Logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("error", "logged you out");
	res.redirect("/campgrounds");
});

module.exports = router;
