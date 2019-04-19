const router   = require("express").Router( )
	, jwt      = require('jsonwebtoken')
	, passport = require("passport");

//How to use: Authorization: JWT *token*

router.post("/login", function(req, res) {
	passport.authenticate("local", { session: false }, function(err, user, info) {

		req.login(user, { session: false }, function(err) {
			if (err)
				throw err;

			if (!user)
				return res.json({"success": false, "msg": "Login failed"});

			const token = jwt.sign(user.toJSON(), 'your_jwt_secret');

			return res.json({"success": true, "user": user, "token": token});
		});
	})(req, res);
});

module.exports = router;