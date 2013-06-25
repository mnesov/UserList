'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
	.value('appState', {
		currentUser: null
	})
	.factory('User', function() {
		var UserState = {
			collection: [],
			lastId: 0
		}

		function User(options) {
			angular.extend(this, {
				// defaults
				rating: 0
			}, options, {
				// overrides
				id: this.id || this.constructor.lastId++
			});

			// overrides
			if (this.birthDate) {
				if ( ! ((this.birthDate instanceof Date) || typeof this.birthDate === 'number' && isFinite(this.birthDate))) {
					throw TypeError(this.constructor.name + ': birthDate should be a valid Date object or a number in Unix timestamp style');
				}
				this.birthDate = this.birthDate instanceof Date ? this.birthDate : new Date(this.birthDate * 1000);
			}

			// special properties
			Object.defineProperty(this, 'fullName', {
				enumerable: false,
				configurable: true,
				get: this.constructor.prototype.getFullName,
				set: this.constructor.prototype.setFullName
			});
			Object.defineProperty(this, 'age', {
				enumerable: false,
				configurable: true,
				get: this.constructor.prototype.getAge,
				set: this.constructor.prototype.setAge
			});

			// add to collection
			this.constructor.collection.push(this);
		}
		angular.extend(User.prototype, {
			getFullName: function() {
				return [this.name || '', this.surname || ''].join(' ').trim();
			},
			setFullName: function(value) {
				var parts = ('' + value.trim()).split(' ');
				this.name = parts.shift() || undefined;
				this.surname = parts.join(' ').trim() || undefined;
			},
			getAge: function() {
				var now = new Date();
				return this.birthDate instanceof Date ?
					now.getFullYear() - this.birthDate.getFullYear() -
						(now < new Date(now.getFullYear(), this.birthDate.getMonth(), this.birthDate.getDate()))
					: undefined;
			},
			setAge: function() {
				throw TypeError(this.constructor.name + ': can not set age directly, please modify birth date instead');
			},
			remove: function() {
				return this.constructor.collection.splice(this.constructor.collection.indexOf(this), 1);
			},
			toJSON: function() {
				var obj = angular.copy(this);
				// conversion to Unix timestamp
				obj.birthDate = obj.birthDate / 1000 |0;
//			['fullName', 'age']
//				.forEach(function(prop) { delete obj[prop]; });
				return obj;
			}
		});
		angular.extend(User,
			UserState, {
				toJSON: function() {
					return UserState;
				}
			});

		return User;
	});