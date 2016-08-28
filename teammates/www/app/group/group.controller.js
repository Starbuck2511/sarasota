(function () {
    'use strict';
    angular.module('app.group', [])
        .controller('GroupController', ['$scope', 'rest', '$state', '$stateParams',
            function ($scope, rest, $state, $stateParams) {
                console.log($state.current);
                if ('app.groups.index' == $state.current.name) {
                    getGroups();
                }

                // @todo check if user can show other groups by manipulation of url
                if ('app.groups.overview' == $state.current.name) {
                    getGroup($stateParams.groupId);
                }

                $scope.createGroup = function (group) {
                    createGroup(group);
                };

                function getGroup(groupId) {

                    rest.getGroup(groupId)
                        .success(function (data) {
                            $scope.group = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to get group ' + error.message;
                        });
                }

                function getGroups() {

                    rest.getGroups()
                        .success(function (data) {
                            $scope.groups = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to get groups ' + error.message;
                        });
                }


                function createGroup(group) {

                    rest.createGroup(group)
                        .success(function (data) {
                            $scope.group = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to save group ' + error.message;
                        });
                }
            }]);
})();