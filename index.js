const express    = require("express")
	, parser     = require("body-parser")
	, mongoose   = require("mongoose")
	, routes     = require("./routes")
	, app 	     = express( );

require("./passport");
mongoose.connect("mongodb://localhost/random_chat_app");

app.use(parser.urlencoded({
	extended: true
}));

app.use(parser.json());

app.use(routes);

app.use(express.static("./public"));

app.get("/", function(req, res) {
	res.sendFile(__dirname+"/index.html");
});

app.listen(3000, ( ) => {
	console.log(`[*] Listening on port 3000`);
});