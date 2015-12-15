var app = angular.module('ecommerce');

app.service('checkoutService', function ($http, $q) {

	this.placeOrder = function (orderDetails) {
		var dfd = $q.defer();

		$http.post('/api/placeOrder', {
			orderDetails: orderDetails
		})
			.then(function (order) {
				dfd.resolve(order.data._id)
			})
			.catch(function (err) {
				dfd.reject(err);
			})

		return dfd.promise;
	}

})