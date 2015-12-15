/* global angular */
var app = angular.module('ecommerce');

app.controller('OrderCtrl', function (orderDetails) {
	var order = this;

	order.details = orderDetails;
});