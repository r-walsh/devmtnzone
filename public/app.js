/* global angular */
var app = angular.module('ecommerce', ['ui.router']);

app.config(function ($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('main', {
			abstract: true,
			templateUrl: 'components/main/mainView.html',
			controller: 'MainCtrl',
			controllerAs: 'main'
		})
		.state('main.landing', {
			url: '/',
			templateUrl: 'components/main/landingView.html'
		})
		.state('main.cart', {
			url: '^/cart',
			templateUrl: 'components/cart/cartView.html',
			controller: 'CartCtrl',
			controllerAs: 'cart',
			resolve: {
				products: function (cartService) {
					return cartService.populateCart();
				}
			}
		})
		.state('main.auth', {
			url: '^/account',
			templateUrl: 'components/auth/authView.html',
			controller: 'AuthCtrl',
			controllerAs: 'auth',
			params: {
				message: ''
			}
		})
		.state('main.orders', {
			url: '^/orders/:id',
			templateUrl: 'components/orders/orderView.html',
			controller: 'OrderCtrl',
			controllerAs: 'order',
			resolve: {
				orderDetails: function (orderService, $stateParams) {
					return orderService.getOrderDetails($stateParams.id);
				}
			}
		})
		.state('main.admin', {
			url: '^/admin',
			templateUrl: 'components/admin/adminView.html',
			controller: 'AdminCtrl',
			controllerAs: 'admin',
			resolve: {
				products: function (adminService) {
					return adminService.getProducts();
				}
			}

		})
		.state('main.products', {
			url: '^/shop',
			templateUrl: 'components/shop/productsView.html',
			controller: 'ShopCtrl',
			controllerAs: 'shop',
			resolve: {
				products: function (shopService) {
					return shopService.getProductsPreview();
				}
			}
		})
		.state('main.productsdetail', {
			url: '^/products/:id',
			templateUrl: 'components/shop/productDetailView.html',
			controller: 'DetailCtrl',
			controllerAs: 'detail',
			resolve: {
				product: function (shopService, $stateParams) {
					return shopService.getProductDetails($stateParams.id);
				}
			}
		})
		.state('main.checkout', {
			url: '^/checkout',
			templateUrl: 'components/checkout/checkoutView.html',
			controller: 'CheckoutCtrl',
			controllerAs: 'checkout',
			resolve: {
				products: function (cartService) {
					return cartService.populateCart();
				}
			}
		})
		.state('main.orderconfirm', {
			url: '^/thanks',
			templateUrl: 'components/static/orderconfirmView.html'
		})
		.state('main.cause', {
			url: '^/cause',
			templateUrl: 'components/static/causeView.html'
		})
		.state('main.story', {
			url: '^/story',
			templateUrl: 'components/static/storyView.html'
		})
		.state('main.blog', {
			url: '^/blog',
			templateUrl: 'components/static/blogView.html'
		});
});


app.run(function ($state, $urlRouter, $rootScope, $window, authService) {
	var bypass = false;
	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
		console.log('error', error);
	});
	
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {

		if (toState.name === 'main.admin' && !$window.localStorage.user) {
			event.preventDefault();
			$state.go('main.auth');
		} else if ((toState.name === 'main.admin' || toState.name === 'main.auth') && $window.localStorage.user) {
			if (bypass) {
				bypass = false;
				return;
			}
			event.preventDefault();
			authService.loginFromLocal(JSON.parse($window.localStorage.user))
				.then(function (res) {
					bypass = true;
					$state.go(toState.name);
				})
				.catch(function (err) {
					console.log(err);
					$state.go('main.auth');
				});
		} else if (toState.name === 'main.checkout' && !$window.localStorage.user) {
			event.preventDefault();
			$state.go('main.auth', { message: 'Please login to continue to checkout.' });
		} else {
			return;
		}
	});
	
	$rootScope.$on('$stateChangeSuccess', function () {
		window.scrollTo(0, 0);
	});
});