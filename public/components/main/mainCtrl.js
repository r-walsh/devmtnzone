var app = angular.module('ecommerce');

app.controller('MainCtrl', function (authService) {
	
	var main = this;
	
	main.isLoggedIn = function () {
		return authService.isLoggedIn();
	}
	
})