const router = require("express").Router( )
	, register = require("./register")
	, login    = require("./login")
	, me       = require("./me");

router.use("/", register);
router.use("/", login);
router.use("/", me);

module.exports = router;