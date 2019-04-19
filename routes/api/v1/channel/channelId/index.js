const router = require("express").Router( )
	, messages = require("./messages")
	, join     = require("./join");

router.use("/", messages);
router.use("/", join);

module.exports = router;