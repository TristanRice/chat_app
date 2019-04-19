const { checkSchema } = require("express-validator/check");

const channel_validation = checkSchema({
	content: {
		isLength: {
			options: { min: 1, max: 255 },
			errorMessage: "Message must be less than 255 characters"
		},
		trim: true,
		escape: true
	}
});

module.exports = channel_validation;