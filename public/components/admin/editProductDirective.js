angular.module('ecommerce')
.directive('editProduct', function () {
	return {
		scope: {
			product: '=',
			finishEdit: '&'
		},
		templateUrl: 'components/partials/editProductModal.html',
		controllerAs: 'edit',
		bindToController: true,
		controller: function (adminService) {
			var edit = this;

			edit.save = function (updatedProduct) {
				updatedProduct._id = edit.product._id;
				adminService.updateProduct(updatedProduct)
					.then(function () {
						edit.finishEdit();
					})
					.catch(function () {
						edit.cancel();
					});
			};
			
			edit.cancel = function () {
				edit.finishEdit();
			};
		}
	};
});