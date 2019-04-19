const create = require("./create")
	, channelId = require("./channelId")
	, router = require("express").Router( );

router.use("/", create);
router.use("/", channelId)

module.exports = router;