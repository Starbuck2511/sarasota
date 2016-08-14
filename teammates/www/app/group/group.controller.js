(function () {
    'use strict';
    angular.module('app.group', [])
        .controller('GroupController', ['$scope', 'rest',
            function ($scope, rest) {

                $scope.status;
                $scope.groups;
                $scope.group;
                $scope.add = function(group) {
                    addGroup(group);
                };

                getUserGroups();

                function getGroups() {
                    rest.getGroups()
                        .success(function (data) {
                            $scope.groups = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to load groups data: ' + error.message;
                        });
                }

                function getUserGroups() {
                    rest.getUserGroups()
                        .success(function (data) {
                            $scope.groups = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to load groups data: ' + error.message;
                        });
                }


                function addGroup(group) {
                    rest.addGroup(group)
                        .success(function (data) {
                            $scope.group = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to save group ' + error.message;
                        });
                }
            }]);
})();