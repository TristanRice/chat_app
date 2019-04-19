const router    = require("express").Router( )
	, passport  = require("passport")
	, validator = require("../../../../validators/validate_message")
	, helpers   = require("../../../../helpers")
	, message   = require("../../../../models/message");

//5cb7655bf32ef22100ce95cb
//general

router.post("/send",

	passport.authenticate("jwt", { session: false }),
	validator,
	helpers.validateData,

	function(req, res) {
		const Message = new message({
			"content": req.body.content,
			"username": req.user.username,
			"server_id": req.body.channel_id,
			"channel_name": req.body.channel_name
		});

		Message.save(function(err){
			if (err)
				throw err;

			return res.json({
				"success": true, 
				"msg": "Message sent successfuly"

			});
		});
	}
);

module.exports = router;