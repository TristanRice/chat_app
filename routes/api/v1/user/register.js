const router    = require("express").Router( )
	, validator = require("../../../../validators/validate_register")
	, helpers   = require("../../../../helpers")
	, user      = require("../../../../models/user");

/*
Registers a new user 

Routes:
/register (/api/v1/user/register)

POST parameters:
username
email
password

GET parameters:

parameters returned:
success: boolean #if the user was added successfully
errType: String #either invalid_data, or not_unique, why the query failed
errors: Array #array of all errors caused by entering incorrect data
msg: String #message to show the user after successful query
*/

router.post("/register",
	validator,
	helpers.validateData,
	function(req, res) {
		const User = new user({
			"username": req.body.username,
			"email": req.body.email,
			"password": req.body.password
		});
		User.hash_password( );

		User.save(function(err) {
			if (err){
				if (err.name=="ValidationError")
					return res.json({
						"success": false,
						"errType": "not_unique",
						"errors": [err.errors]
					});
				
				throw err;
			}
			return res.json({"success": true, "msg": "New user created"});
		});
	}
);

module.exports = router;