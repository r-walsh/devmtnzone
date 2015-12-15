/* global angular */
var app = angular.module('ecommerce');

app.controller('CheckoutCtrl', function ($state, $window, products, cartService, checkoutService) {
	var checkout = this;

	checkout.products = products;
	checkout.subtotal = cartService.getSubtotal();
	checkout.orderComplete = false;

	checkout.order = function () {
		checkout.orderDetails.products = checkout.products;
		checkout.orderDetails.user = JSON.parse($window.localStorage.user)._id;
		checkoutService.placeOrder(checkout.orderDetails)
			.then(function (orderNumber) {
				checkout.orderDetails = {};
				cartService.clearCart();
				checkout.orderNumber = orderNumber;
				checkout.orderComplete = true;
				// $state.go('main.orderconfirm');
			})
			.catch(function (err) {
				console.log(err);
			});
	};

});