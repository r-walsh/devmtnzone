/* global angular */
var app = angular.module('ecommerce');

app.controller('DetailCtrl', function (product, $state, cartService) {
	var detail = this;

	detail.product = product;


	detail.addToCart = function (itemId, quantity) {
		cartService.addToCart(itemId, quantity);
		$state.go('main.cart');
	};

});