'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
	.directive('datepicker', function(){
		return {
			require: '?ngModel',
			restrict: 'A',
			link: function ($scope, element, attrs, controller) {
				var updateModel, onblur;

				if (controller != null) {

					updateModel = function (event) {
						element.blur();
					};

					onblur = function () {
						//we'll update the model in the blur() handler
						//because it's possible the user put in an invalid date
						//in the input box directly.
						//Bootstrap datepicker will have overwritten invalid values
						//on blur with today's date so we'll stick that in the model.
						//this assumes that the forceParse option has been left as default(true)
						//https://github.com/eternicode/bootstrap-datepicker#forceparse
						var date = element.valueAsDate;
						return $scope.$apply(function () {
							return controller.$setViewValue(date);
						});
					};

					controller.$render = function () {
						var date = controller.$viewValue;

						console.log('rendering date', controller);
						if (angular.isDefined(date) && date != null && angular.isDate(date))
						{
//							element.datepicker().data().datepicker.date = date;
//							element.datepicker('setValue');
//							element.datepicker('update');
							element[0].valueAsDate = date;

						} else if (angular.isDefined(date)) {
							throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
						}
						return controller.$viewValue;
					};
				}
				return attrs.$observe('datepicker', function (value) {
					console.log('appState.currentUser.birthdate value', typeof value, value, element);
					element[0].valueAsDate = new Date();
					return element;
				});
			}
		};
	});

