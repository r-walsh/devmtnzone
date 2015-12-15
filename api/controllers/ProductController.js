var Product = require('../models/ProductModel.js');
var Q = require('q');

module.exports = {

	getProductList: function (req, res) {
		Product.find()
			.select('name price image imageAlt')
			.exec(function (err, products) {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json(products);
			});
	},
	getProductDetails: function (req, res) {
		var id = req.params.id;
		Product.findById(id)
			.exec(function (err, product) {
				if (err) {
					console.log(err);
					return res.status(500).json(err);
				}
				return res.status(200).json(product);
			});
	},
	//admin - protected route
	addProduct: function (req, res) {
		var newProductDetails = req.body.product;

		var newProduct = new Product(newProductDetails);
		newProduct.save(function (err, saved) {
			if (err) {
				return res.status(500).json(err);
			}
			return res.status(200).json(saved);
		});
	},
	updateProduct: function (req, res) {
		var id = req.params.id;
		var updatedProduct = req.body.updatedProduct;
		Product.findByIdAndUpdate(id, updatedProduct, { new: true })
			.exec(function (err, saved) {
				if (err) {
					console.log(err);
					return res.status(500).json(err);
				}
				return res.status(200).json(saved);
			});
	},
	//admin - protected route
	getAllProducts: function (req, res) {
		Product.find()
			.exec(function (err, products) {
				if (err) {
					console.log(err);
					return res.status(500).json(err);
				}
				return res.status(200).json(products);
			});
	},
	//admin - protected route
	deleteProduct: function (req, res) {
		var deleteId = req.params.id;
		Product.findByIdAndRemove(deleteId).exec(function (err, result) {
			if (err) {
				console.log(err);
				return res.status(500).json(err);
			}
			return res.status(200).json(result);
		});
	},
	populateCart: function (req, res) {
		var dfd = Q.defer();
		var cart = req.body.cart;
		var populatedCart = [];
		var promises = [];
		var quantities = [];
		for (var key in cart) {


			var promise = Product.findById(key).exec(function (err, product) {
				if (err) {
					return dfd.reject(err);
				}
				populatedCart.push({ product: product });
			});
			promises.push(promise);
			quantities.push(cart[key]);
		}
		Q.all(promises).then(function () {
			for (var i = 0; i < populatedCart.length; i++) {
				populatedCart[i].qty = quantities[i];
			}
			res.status(200).json(populatedCart);
		});
	}

};