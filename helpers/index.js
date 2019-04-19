const { validationResult } = require("express-validator/check")

module.exports = {
	validateData: (req, res, next) => {
		const errors = validationResult(req).array( );

		if (errors.length)
			return res.json({
				"success": false,
				"errType": "invalid_data",
				"errors": errors
			});

		if (req.query.test)
			return res.json({
				"success": true,
				"msg": "Valid data entered"
			});

		next( );
	}
}