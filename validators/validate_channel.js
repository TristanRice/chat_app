const { checkSchema } = require("express-validator/check");

const channel_validation = checkSchema({
	name: {
		isLength: {
			options: { min: 3, max: 20 },
			errorMessage: "Channel name length must be between 3 and 20 characters long"
		},
		isAlphaNumeric: {
			errorMessage: "Channel name must be alphanumeric"
		},
		trim: true,
		escape: true
	}
});

module.exports = channel_validation;