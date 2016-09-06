(function () {
    'use strict';
    angular.module('app.schedule', [])
        .controller('ScheduleController', ['$scope', 'rest', '$state', '$stateParams',
            function ($scope, rest, $state, $stateParams) {
                console.log($state.current);
                var groupId = $stateParams.groupId;
                $scope.groupId = groupId;

                if ('app.groups.schedules.index' == $state.current.name) {
                    getGroupSchedules(groupId);
                }



                $scope.createGroupSchedule = function (groupId, schedule) {
                    createGroupSchedule(groupId, schedule);
                };

                function getGroupSchedules(groupId) {

                    rest.getGroupSchedules(groupId)
                        .success(function (data) {
                            $scope.schedules = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to get schedule ' + error.message;
                        });
                }

                function createGroupSchedule(groupId, schedule) {

                    // we save values as an object here, angular ng-model does in this case return an array form model
                    var obj = {};
                    obj.type = schedule.type;
                    obj.startDate = schedule.startDate;

                    // rest expects schedule as an object parameter
                    rest.createGroupSchedule(groupId, obj)
                        .success(function (data) {
                            $scope.schedule = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to save schedule ' + error.message;
                        });
                }
            }]);
})();