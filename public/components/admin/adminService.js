/* global angular */
var app = angular.module('ecommerce');

app.service('adminService', function ($http, $q) {

	this.addProduct = function (newProduct) {
		var dfd = $q.defer();

		$http.post('/api/admin/addProduct', {
			product: newProduct
		})
			.then(function (response) {
				dfd.resolve(response.data);
			})
			.catch(function (error) {
				dfd.reject(error);
			});

		return dfd.promise;
	};

	this.updateProduct = function (updatedProduct) {
		var dfd = $q.defer();

		$http.put('/api/admin/updateProduct/' + updatedProduct._id, {
			updatedProduct: updatedProduct
		})
			.then(function (response) {
				dfd.resolve(response.data);
			})
			.catch(function (err) {
				dfd.reject(err);
			});

		return dfd.promise;
	};

	this.getProducts = function () {
		var dfd = $q.defer();

		$http.get('/api/admin/allProducts')
			.then(function (products) {
				dfd.resolve(products.data);
			})
			.catch(function (err) {
				dfd.reject(err);
			});

		return dfd.promise;
	};

	this.deleteProduct = function (id) {
		var dfd = $q.defer();

		$http.delete('/api/admin/deleteProduct/' + id)
			.then(function (response) {
				dfd.resolve(response.data);
			})
			.catch(function (err) {
				dfd.reject(err);
			});

		return dfd.promise;
	};

});