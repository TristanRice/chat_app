const send = require("./send")
	, router = require("express").Router( );

router.use("/", send);

module.exports = router;