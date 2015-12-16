angular.module('ecommerce')
.controller('DetailCtrl', function ($state, cartService) {
	var detail = this;


	detail.addToCart = function (itemId, quantity) {
		cartService.addToCart(itemId, quantity);
		$state.go('main.cart');
	};

});