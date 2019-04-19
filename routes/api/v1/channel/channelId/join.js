const router = require("express").Router( )
	, passport = require("passport")
	, server = require("../../../../../models/channel");

router.get("/:channelId/join",
	passport.authenticate("jwt", { session: false }),

	function(req, res) {
		const channel_id = req.params.channelId || "a";
		server.findById(channel_id, function(err, Server) {
			if (err)
				throw err;


			if (!Server.join_user(req.user.username))
				return res.json({
					"success": false,
					"message": "You are already a member of this server"
				});
			
			Server.save(function(err) {
				if (err)
					throw err;

				return res.json({
					"success": true, 
					"message": "Successfully joined channell"
				});
			});
		});	
	}
);

module.exports = router;