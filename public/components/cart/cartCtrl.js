/* global angular */
var app = angular.module('ecommerce');

app.controller('CartCtrl', function ($state, cartService, products) {
	var cart = this;

	cart.products = products || [];

	cart.subtotal = cartService.getSubtotal();

	cart.update = function (itemId, quantity) {
		cartService.updateCart(itemId, quantity)
			.then(function () {
				$state.reload();
			});
	};

	cart.remove = function (itemId) {
		cartService.removeFromCart(itemId);
		$state.reload();
	};

});