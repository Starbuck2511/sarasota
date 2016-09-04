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

            rest.getUserGroup = function (groupId) {
                return $http.get(API_ENDPOINT.url + '/users/' + user.getId() + '/groups/' + groupId);
            };

            rest.getGroup = function (groupId) {
                return $http.get(API_ENDPOINT.url + '/groups/' + groupId);
            };

            rest.createGroup = function (group) {
                return $http.post(API_ENDPOINT.url + '/groups', group);
            };

            rest.getGroupSchedules = function (groupId) {
                return $http.get(API_ENDPOINT.url + '/groups/' + groupId + '/schedules');
            };

            rest.createGroupSchedule = function (groupId, schedule) {
                return $http.post(API_ENDPOINT.url + '/groups/' + groupId + '/schedules', schedule);
            };

            return rest;
        }]);


})();