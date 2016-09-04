(function () {
    'use strict';
    angular.module('app.schedule', [])
        .controller('ScheduleController', ['$scope', 'rest', '$state', '$stateParams',
            function ($scope, rest, $state, $stateParams) {
                console.log($state.current);

                var groupId = $stateParams.groupId;
                $scope.groupId = groupId;
                getGroupSchedules(groupId);

                $scope.createGroupSchedule = function (schedule) {
                    createGroupSchedule(schedule);
                };

                function getGroupSchedules(groupId) {

                    rest.getGroupSchedules(groupId)
                        .success(function (data) {
                            $scope.schedule = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to get schedule ' + error.message;
                        });
                }

                function createGroupSchedule(groupId, schedule) {

                    rest.createGroupSchedule(groupId, schedule)
                        .success(function (data) {
                            $scope.schedule = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to save schedule ' + error.message;
                        });
                }
            }]);
})();