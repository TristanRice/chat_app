const mongoose = require("mongoose")
	, bcrypt   = require("bcrypt")
	, uniqueValidator = require("mongoose-unique-validator")
	, Schema   = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	deleted: {
		type: Boolean,
		required: false,
		default: false
	},

	admin: {
		type: Boolean,
		required: false,
		default: false,
	}
});

UserSchema.methods.hash_password = function( ) {
	this.password = bcrypt.hashSync(this.password, 10);
}

UserSchema.methods.verify_password = function(password) {
	console.log(this);
	return bcrypt.compareSync(password, this.password);
}

UserSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("User", UserSchema);