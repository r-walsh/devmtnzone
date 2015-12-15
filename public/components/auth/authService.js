var app = angular.module('ecommerce');

app.service('authService', function ($http, $q, $window) {

	this.register = function (user) {
		var dfd = $q.defer();

		$http.post('/api/signup', user)
			.then(function (response) {
				dfd.resolve(response.data)
			})
			.catch(function (err) {
				dfd.reject(err);
			})

		return dfd.promise;
	}

	this.login = function (user) {
		var dfd = $q.defer();

		$http.post('/api/login', user)
			.then(function (response) {
				$window.localStorage.user = JSON.stringify(response.data);
				dfd.resolve(response.data)
			})
			.catch(function (err) {
				dfd.reject(err);
			})

		return dfd.promise;
	}
	
		this.loginFromLocal = function (user) {
		var dfd = $q.defer();

		$http.post('/api/loginFromLocal', { user: user })
			.then(function (response) {
				$window.localStorage.user = JSON.stringify(response.data);
				dfd.resolve(response.data)
			})
			.catch(function (err) {
				dfd.reject(err);
			})

		return dfd.promise;
	}

	this.logout = function () {
		var dfd = $q.defer();

		$http.get('/api/logout')
			.then(function () {
				delete $window.localStorage.user;
				dfd.resolve();
			})
			.catch(function (err) {
				console.log(err);
				dfd.reject(err);
			})

		return dfd.promise;
	}

	this.isLoggedIn = function () {
		if ($window.localStorage.user) {
			return true;
		} else {
			return false;
		}
	}
	
	this.findMyOrders = function () {
		var dfd = $q.defer();
		if ($window.localStorage.user) {
			$http.get('/api/myOrders/' + JSON.parse($window.localStorage.user)._id)
				.then(function (orders) {
					dfd.resolve(orders.data);
				})
				.catch(function (err) { 
					dfd.reject(err);
				})
		} else {
			var orders = [];
			dfd.resolve(orders);
		} 
		
		return dfd.promise;
	}

})