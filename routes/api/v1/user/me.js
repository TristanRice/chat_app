const passport = require("passport")
	, router   = require("express").Router( );

router.get("/me", 
	passport.authenticate("jwt", { session: false }),
	function(req, res) {
		return res.json({
			"username": req.user.username,
			"email": req.user.email
		});
	}
);

module.exports = router;