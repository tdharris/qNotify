var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: 	{ type: String, required: true }
	, email: 	{ type: String }
	, txt: 		{ type: String }
});

var User = mongoose.model('User', userSchema);