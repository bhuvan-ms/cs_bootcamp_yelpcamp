var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX route
router.get("/", function(req, res){ //campgrounds page which displays the images 
	Campground.find({}, function(err, allCampgrounds){ //finds all data in the campground database and displays it
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds : allCampgrounds, currentUser : req.user});
		}
	});
	
});

//CREATE route
router.post("/",middleware.isLoggedIn, function(req, res){ // campgrounds post route the one above is get route both can be of same routes
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body. description;
	var author = {
		id:req.user._id,
		username:req.user.username
		
	}
	var newCampgrounds = {name:name, image:image, description:desc, author:author, price:price}
	
	Campground.create(newCampgrounds, function(err, camp){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds")
		}
	});
	
});

//NEW route
router.get("/new",middleware.isLoggedIn, function(req, res){ //page to post any new images or pages
	res.render("campgrounds/new.ejs");
});



//SHOW route
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show.ejs", {campground:foundCampground});
		}
	});
});



//EDIT CAMPGROUND
router.get("/:id/edit",middleware.checkCampgroundOwner, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		req.flash("error", "campground not found")
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});




//update CAMPGROUND
router.put("/:id",middleware.checkCampgroundOwner, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


//destroy campgrounds router
router.delete("/:id",middleware.checkCampgroundOwner, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});





module.exports = router;