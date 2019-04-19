const router = require("express").Router( )
	, v1     = require("./v1");

router.use("/v1", v1);

module.exports = router;