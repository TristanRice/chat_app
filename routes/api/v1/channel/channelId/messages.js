const router = require("express").Router( )
	, passport = require("passport")
	, Messages = require("../../../../../models/message")
	, Server   = require("../../../../../models/channel");

router.get("/:channelId/messages",
	passport.authenticate("jwt", { session: false }),
	function(req, res) {
		const limit = req.query.limit || 50;
		const server_id = req.params.channelId;
		const channel_name = req.query.channel_name;
		console.log(server_id);
		Server.findById(server_id, function(err, Server) {
			if (!Server.has_member(req.user.username))
				return res.json({
					"success": false, 
					"msg": "You are not a member of this server"
				});

			Messages.find({
				"server_id": server_id,
				"channel_name": channel_name
			}).sort({"date_created": -1}).limit(limit).exec(function(err, Messages) {
				if (err)
					throw err;

				return res.json({
					"successful": true,
					"messages": Messages
				});
			});
		});
	}
);

module.exports = router;