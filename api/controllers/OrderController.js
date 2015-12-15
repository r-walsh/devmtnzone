var Order = require('../models/OrderModel.js');

module.exports = {
	saveOrder: function (req, res) {
		var newOrder = new Order(req.body.orderDetails);
		newOrder.save(function (err, saved) {
			if (err) {
				console.log(err);
				return res.status(500).json(err);
			}
			return res.status(200).json(saved);
		});
	},
	findMyOrders: function (req, res) {
		var id = req.params.id;
		Order.find({ user: id })
			.select('_id, date')
			.exec(function (err, orders) {
				if (err) {
					console.log(err);
					return res.status(500).json(err);
				}
				return res.status(200).json(orders);
			});
	},
	getOrderDetails: function (req, res) {
		var id = req.params.id;
		Order.findById(id).exec(function (err, order) {
			if (err) {
				console.log(err);
				return res.status(500).json(err);
			}
			return res.status(200).json(order);
		});

	}
};