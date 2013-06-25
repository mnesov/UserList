'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ui.bootstrap', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
			.when('/list', {
			})
			.when('/edit', {

			})
			.when('/edit/:id', {

			})
			.when('/stat', {
			})
			.otherwise({redirectTo: '/list'});
  }])
	.config(['$locationProvider', function($locationProvider) {
		// $locationProvider.html5Mode(true);
	}])
	.config(['$compileProvider', function($compileProvider) {
		$compileProvider.directive('compile', function($compile) {
			return function(scope, element, attrs) {
				scope.$watch(
					function(scope) {
						return scope.$eval(attrs.compile);
					},
					function(value) {
						element.html(value);
						$compile(element.contents())(scope);
					}
				);
			};
		})
	}])
;
