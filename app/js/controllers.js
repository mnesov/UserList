'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	controller('UserListCtrl', function($scope, $location, User, appState) {
		angular.extend($scope, {
			User: User,
			appState: appState,
			activateUser: function() {
				appState.currentUser = this.user;
			},
			addUser: function() {
				var user = new User();
			},
			removeUser: function() {
				this.user.remove();
			},
			editUser: function() {
				appState.currentUser = this.user;
				$location.path('/edit/'+this.user.id);
			}
		});

	})
	.controller('UserProfileCtrl', function($scope, User, appState) {
		angular.extend($scope, {
			User: User,
			appState: appState
		});
	})
	.controller('UserStatCtrl', function($scope) {
		 console.log('UserStatCtrl', arguments);
	})
	.controller('UserViewCtrl', function($scope, $route, $routeParams, $location, $http, User, appState) {
		angular.extend($scope, {
			$location: $location,
			panes: [{
				heading: 'User list',
				contentUrl: 'partials/user-list.html',
				path: '/list'
			}, {
				heading: 'User profile',
				contentUrl: 'partials/user-profile.html',
				path: '/edit'
			}, {
				heading: 'Statistics',
				contentUrl: 'partials/user-stat.html',
				path: '/stat'
			}],
			onSelect: function() {
				var pane = this.pane;
				$http
					.get(pane.contentUrl, { cache: true })
					.success(function(data){
						pane.content = data;
					});

				if ( ! (new RegExp('^' + pane.path + '/.*')).test($location.path())) {
					$location.path(pane.path);
				}
			}
		});

		// TODO: remove this dumb data
		[
			{ name: "Moroni", birthDate: new Date(1977,5,12), rating: 0 },
			{ name: "Tiancum", birthDate: new Date(1978,7,24), rating: 0 },
			{ name: "Lida", birthDate: new Date(1983,8,3), rating: 0 },
			{ name: "Max", birthDate: new Date(1978,8,14), rating: 0 },
			{ name: "Enos", birthDate: new Date(1990,3,16), rating: 0 }
		].forEach(function(userData){
				new User(userData);
			});
		appState.currentUser = User.collection[0]

	});
