var app = angular.module('app', ['ui.router','ui.utils.masks'])

.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('dashboard', {
		url: '/',
		views: {
			'content@' : {
				templateUrl: 'partials/list.html',
				controller: 'ListController'
			}
		}
	})
	.state('dashboard.product', {
		url: 'product/:id',
		views: {
			'content@' : {
				templateUrl: 'partials/product.html',
				controller: 'ProductController'
			}
		}
	})

	$urlRouterProvider.otherwise('/');

})