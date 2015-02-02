// app/models/user.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema(
		{
			email    : String,
			password : String,
			profile  : String,
			name     : {
				first    : String,
				last     : String
			},
			fiche    :
			[
				{
					
				}
			]
		}
	);

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('User', userSchema);