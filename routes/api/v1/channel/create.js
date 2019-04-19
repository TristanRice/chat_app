const router    = require("express").Router( )
	, passport  = require("passport")
	, helpers   = require("../../../../helpers")
	, validator = require("../../../../validators/validate_channel")
	, Channel   = require("../../../../models/channel");



router.post("/create", 

	passport.authenticate("jwt", { session: false }),	
	validator,
	helpers.validateData,
	
	function(req, res) {
		const channel = new Channel({
			"name": req.body.name,
			"admins": [{"username": req.user.username}]
		});
		channel.build_server( );

		channel.save(function(err, server) {
			if (err) {
				if (err.name=="ValidationError")
					return res.json({
						"success": false,
						"errType": "not_unique",
						"errosr": [err.errors]
					});

				throw err;
			}
			console.log(server);
			return res.json({"success": true, "server": server});
		});
	}
);

module.exports = router;