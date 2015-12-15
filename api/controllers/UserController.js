var User = require('../models/UserModel.js');

module.exports = {
	signup: function (req, res) {
		var newUser = new User(req.body);
		newUser.save(function (err, saved) {
			if (err) {
				return res.status(500).send('error creating user');
			}
			return res.status(200).send('successful registration');
		});
	}
};