var express 	= 	require("express"),
    app 	    = 	express(),
    mongoose    = 	require("mongoose"),
	flash    	=	require("connect-flash"),
	passport 	=   require("passport"),
	localStrategy = require("passport-local"),
	methodoverride = require("method-override"),
	Campground 	=	require("./models/campground.js"), // data coming from module.export in campground.js
	Comment	    =	require("./models/comments.js"), //data from comment.js
	User        =   require("./models/user.js"),
	commentRoute =  require("./routes/comments.js"),
	campgroundRoute = require("./routes/campgrounds.js"),
	indexRoutes = require("./routes/index.js"),
	seedDB		=	require("./seeds.js"),
    bodyParser  = 	require("body-parser") // both the lines are common when using body parser
	app.use(bodyParser.urlencoded({extended : true})); // bodyParser is used to extract data from  the webpage
	app.use(express.static(__dirname + "/public"));
	app.use(methodoverride("_method"));
	app.use(flash());


// seedDB();  //seeding the database
mongoose.set('useNewUrlParser', true); // copied from the mongoose website to stop deprecaaion warning
mongoose.set('useFindAndModify', false); // copied from the mongoose website to stop deprecaaion warning
mongoose.set('useCreateIndex', true); // copied from the mongoose website to stop deprecaaion warning
mongoose.set('useUnifiedTopology', true); // copied from the mongoose website to stop deprecaaion warning
mongoose.connect("mongodb+srv://noah:doom2016@cluster0.djkyp.mongodb.net/Cluster0?retryWrites=true&w=majority");
// mongodb+srv://noad:<password>@cluster0.djkyp.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongoose.connect("mongodb://localhost/yelp_camp");// to connect to mongodb serverlocally
	
	

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret : "I am batman",
	resave : false,
	saveUninitialized : false	
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.set("view engine", "ejs");// to make sure all the render files mentioned is of ejs format

app.use(function(req, res, next){   //used for ui IN nav header file
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next(); 
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);


app.listen(process.env.PORT || 5000) // this is the command that should be used when deploying apps to heroku cause it's the default number set for node.js apps