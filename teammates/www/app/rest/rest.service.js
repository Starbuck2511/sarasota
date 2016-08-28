(function () {
    'use strict';

    angular
        .module('app.rest',[])
        .factory('rest', ['$http', 'API_ENDPOINT', 'user', function ($http, API_ENDPOINT, user) {

            var rest = {};

            rest.getGroups = function () {
                return $http.get(API_ENDPOINT.url + '/groups');
            };

            rest.getUserGroups = function () {
                return $http.get(API_ENDPOINT.url + '/users/' + user.getId() + '/groups');
            };

            rest.getUserGroup = function (id) {
                return $http.get(API_ENDPOINT.url + '/users/' + user.getId() + '/groups/' + id);
            };

            rest.getGroup = function (id) {
                return $http.get(API_ENDPOINT.url + '/groups/' + id);
            };

            rest.createGroup = function (group) {
                return $http.post(API_ENDPOINT.url + '/groups', group);
            };

            return rest;
        }]);


})();