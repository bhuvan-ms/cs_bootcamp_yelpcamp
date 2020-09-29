var mongoose 	= 	require("mongoose");
var Campground 	=	require("./models/campground.js");
var Comment 	=	require("./models/comments.js");
var data		=	[
	{
		name:"rook island",
		image:"https://images.unsplash.com/photo-1534774677826-17b100ccca04?ixlib=rb-	1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum. Quis blandit turpis cursus in hac habitasse platea dictumst. Adipiscing enim eu turpis egestas pretium. Vitae et leo duis ut diam quam nulla. Praesent elementum facilisis leo vel fringilla est. Duis tristique sollicitudin nibh sit amet commodo nulla. Sem nulla pharetra diam sit. Leo vel fringilla est ullamcorper."
	},
	
		{
		name:"rook island",
		image:"https://images.unsplash.com/photo-1534774677826-17b100ccca04?ixlib=rb-	1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum. Quis blandit turpis cursus in hac habitasse platea dictumst. Adipiscing enim eu turpis egestas pretium. Vitae et leo duis ut diam quam nulla. Praesent elementum facilisis leo vel fringilla est. Duis tristique sollicitudin nibh sit amet commodo nulla. Sem nulla pharetra diam sit. Leo vel fringilla est ullamcorper."
	},
	
		{
		name:"rook island",
		image:"https://images.unsplash.com/photo-1534774677826-17b100ccca04?ixlib=rb-	1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum. Quis blandit turpis cursus in hac habitasse platea dictumst. Adipiscing enim eu turpis egestas pretium. Vitae et leo duis ut diam quam nulla. Praesent elementum facilisis leo vel fringilla est. Duis tristique sollicitudin nibh sit amet commodo nulla. Sem nulla pharetra diam sit. Leo vel fringilla est ullamcorper."
	}
]
function seedDB(){
	//removing data
	Campground.deleteMany({}, function(err){
	if(err){
		console.log(err);
	}
		console.log("data removed");
			//adding a new campground
		data.forEach(function(seed){
			Campground.create(seed,function(err, campground){
				if(err){
					console.log(err);
				}else{
					console.log("data addded");
					//create a comment
					Comment.create(
						{
							text:"very good place",
							author:"jason brody"
						}, function(err, comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment); //Can't figure out this error can 
								campground.save();
								console.log("comment created");
								
							}
						}
					)
				}
			});
		});
	});
}

module.exports = seedDB;