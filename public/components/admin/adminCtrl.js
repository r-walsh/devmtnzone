/* global angular */
var app = angular.module('ecommerce');

app.controller('AdminCtrl', function (adminService, $timeout, products) {
	var admin = this;
	admin.addConfirm = '';
	admin.editing = false;
	admin.products = products;

	admin.addProduct = function () {
		adminService.addProduct(admin.newProduct)
			.then(function (savedProduct) {
				admin.addConfirm = 'Product saved - ' + savedProduct.name;
				$timeout(function () {
					admin.addConfirm = '';
				}, 3000);
				admin.newProduct = {};
				admin.getUpdatedProducts();
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	admin.deleteItem = function (id) {
		adminService.deleteProduct(id).then(function () {
			admin.getUpdatedProducts();
		});
	};

	admin.getUpdatedProducts = function () {
		adminService.getProducts().then(function (updatedProducts) {
			admin.products = updatedProducts;
		});
	};

	admin.edit = function (item) {
		console.log('editing', item);
		admin.editing = true;
		admin.editItem = item;
	};

	admin.finishEdit = function () {
		admin.editing = false;
		admin.editItem = {};
		admin.getUpdatedProducts();
	};

});