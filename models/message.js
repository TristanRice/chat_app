const mongoose = require("mongoose")
	, User     = require("./user")
	, Schema   = mongoose.Schema;

const MessageSchema = new Schema({
	content: {
		type: String,
		required: true
	},

	username: {
		type: String,
		sparse: true
	},

	server_id: {
		type: String
	},

	channel_name: {
		type: String
	},

	date_created: {
		type: Date
	},

	date_updated: {
		type: Date
	}
});

MessageSchema.pre('save', function(next) {
	datetime = new Date( );
	this.date_created = this.date_created || datetime;
	this.date_updated = datetime;
	next( );
});

module.exports = mongoose.model("Message", MessageSchema);