angular.module('ecommerce')
.controller('CartCtrl', function ($state, cartService) {
	var cart = this;

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