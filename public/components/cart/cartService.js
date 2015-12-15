/* global angular */
var app = angular.module('ecommerce');

app.service('cartService', function ($window, $http, $q) {

	var cart = $window.localStorage.cart ? JSON.parse($window.localStorage.cart) : {};
	this.subtotal;

	this.setSubtotal = function (newSubtotal) {
		this.subtotal = newSubtotal;
	};

	this.getSubtotal = function () {
		return this.subtotal;
	};

	this.addToCart = function (itemId, quantity) {
		cart[itemId] = quantity;
		$window.localStorage.cart = JSON.stringify(cart);
	};

	this.removeFromCart = function (itemId) {
		delete cart[itemId];
		$window.localStorage.cart = JSON.stringify(cart);
	};

	this.updateCart = function (itemId, quantity) {
		var dfd = $q.defer();
		cart[itemId] = quantity;
		$window.localStorage.cart = JSON.stringify(cart);
		dfd.resolve();
		return dfd.promise;
	};

	this.clearCart = function () {
		cart = {};
		$window.localStorage.cart = JSON.stringify({});
	};

	this.populateCart = function () {
		var dfd = $q.defer();

		if (Object.getOwnPropertyNames(cart).length > 0) {
			$http.post('/api/cartDetails', {
				cart: cart
			})
				.then(function (cart) {
					var total = 0;
					for (var i = 0; i < cart.data.length; i++) {
						total += cart.data[i].product.price * cart.data[i].qty;
					}
					this.setSubtotal(total);
					dfd.resolve(cart.data);
				}.bind(this))
				.catch(function (err) {
					dfd.reject(err);
				});

			return dfd.promise;

		} else {
			return null;
		}
	};



});