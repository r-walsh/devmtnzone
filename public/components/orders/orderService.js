var app = angular.module('ecommerce')

app.service('orderService', function ($http, $q) {

	this.getOrderDetails = function (id) {
		var dfd = $q.defer();

		$http.get('/api/orderDetails/' + id)
			.then(function (order) {
				dfd.resolve(order.data);
			})
			.catch(function (err) {
				dfd.reject(err);
			})

		return dfd.promise;
	}
})