angular.module('ecommerce')
.service('cartService', function ($window, $http, $q) {

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
		
	};



});