var app = angular.module('ecommerce');

app.controller('ShopCtrl', function (products, $state) {
	var shop = this;
	
	shop.products = products;
	
	shop.viewItem = function (id) {
		$state.go('main.productsdetail', {id: id})
	}
})