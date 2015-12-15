var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var q = require('q');

var User = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		type: Schema.ObjectId,
		ref: 'Cart'
	}
});

User.pre('save', function (next) {
	var user = this;

	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, function (err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			user.password = hash;
			return next();
		});
	});
});

User.methods.verifyPassword = function (password) {
	var dfd = q.defer();

	bcrypt.compare(password, this.password, function (err, isMatch) {
		if (err) {
			dfd.reject(err);
		}
		else {
			dfd.resolve(isMatch);
		}
	});

	return dfd.promise;
};

User.options.toJSON = {
	transform: function (doc, ret) {
		delete ret.__v;
		delete ret.password;
		return ret;
	}
};

module.exports = Mongoose.model('User', User);