const mongoose = require("mongoose")
	, User     = require("./user")
	, unique_validator = require("mongoose-unique-validator")
	, Schema   = mongoose.Schema;

user_json = {
	username: {
		type: String
	}
}

const ChannelSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},

	channels: [
		{
			name: {
				type: String,
			},

			type: {
				type: String,
				default: "text",
				enum: [
					"text",
					"voice"
				],
				required: false
			},

			messages: [
				{
					content: {
						type: String
					},

					user: {
						username: {
							type: String
						}
					}
				}
			]
		}
	],

	created_at: {
		type: Date
	},

	updated_at: {
		type: Date
	},

	admins: [
		user_json
	],

	members: [
		user_json
	],
});

ChannelSchema.methods.build_server = function( ) {
	//first make a new text channel called general
	this.channels.push({
		name: "genral",
		type: "text"
	});
}

ChannelSchema.methods.send_message = function(channel) {
	return this.channels; 
}

ChannelSchema.methods.has_member = function(username) {
	return this.members.find(element => element["username"] === username);
}

ChannelSchema.methods.join_user = function(username) {
	if (this.has_member(username)) return false;
	this.members.push({"username": username});
	return true;
}


ChannelSchema.pre("save", function(next) {
	const datetime = new Date( );
	this.created_at = this.created_at || datetime;
	this.updated_at = datetime;
	next( );
});

ChannelSchema.plugin(unique_validator, { type: "mongoose-unique-validator" });

module.exports = mongoose.model("Channel", ChannelSchema);