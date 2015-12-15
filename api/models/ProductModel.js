var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var Product = Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	price: {
		type: Number
	},
	details: {
		type: String
	},
	image: {
		type: String,
		default: '/images/products/imgnotavailable.png'
	},
	imageAlt: {
		type: String
	}
});

module.exports = Mongoose.model('Product', Product);