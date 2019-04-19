const router  = require("express").Router( )
	, channel = require("./channel")
	, message = require("./message")
	, user    = require("./user");

router.use("/user", user);
router.use("/channel", channel);
router.use("/message", message)

module.exports = router;