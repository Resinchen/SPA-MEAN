const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  phone: String,
  site: String,
  logo: String,
  card1: { name: String, price: String, image: String },
  card2: { name: String, price: String, image: String },
  card3: { name: String, price: String, image: String },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
}

userSchema.methods.verifyPassword = function(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
	return this.hash === hash;
}

userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate + 7);
	
	return jwt.sign({
		_id: this._id,
		email: this.email,
	}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;