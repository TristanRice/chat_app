const { checkSchema } = require("express-validator/check")
	, validator = require("validator")

const register_validation = checkSchema({
	username: {
		escape: true,
		isLength: {
			options: { min: 3, max: 15},
			errorMessage: "Username must be between 3 and 15 characters long"
		},
		custom: {
			options: (username, { req }) => {
				const re = /^[a-z0-9]+$/i;
				if (username && !username.match(re))
					throw new Error("Username must be alphanumeric");

				return true;
			}
		},
		trim: true
	},

	email: {
		custom: {
			/*I would use isEmail from express-validator normally, but that allows
			  utf-8 emails, which for the most part seem to be invalid
			*/
			options: (email, { req }) => {
				if (!validator.isEmail(email, { 
					"allow_utf8_local_part": false,
					"domain_specific_validation": true,
					"allow_ip_domain": true
				}))
					throw new Error("You must enter a valid email");

				return true;
			}
		}
	},

	password: {
		custom: {
			options: (password, { req }) => {
				re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_(=)])(?=.{8,})/
				if (!password.match(re))
					throw new Error("Your password must contain a lowercase letter, an uppercase letter, a number, and a special character");

				const password2 = req.body.password2;
				if (!password2 || password !== password2)
					throw new Error("Passwords must match");

				return true;
			}
		}
	}
});


module.exports = register_validation;