var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var Order = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		title: {
			type: String
		},
		first: {
			type: String
		},
		last: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now
	},
	address: {
		street: {
			type: String
		},
		city: {
			type: String
		},
		zip: {
			type: String
		}
	},
	products: {
		type: Schema.Types.Mixed
	}


});

module.exports = Mongoose.model('Order', Order);