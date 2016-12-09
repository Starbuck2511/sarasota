(function () {
    'use strict';
    angular.module('app.schedule', [])
        .controller('ScheduleController', ['$scope', 'rest', '$state', '$stateParams', '$ionicActionSheet',
            function ($scope, rest, $state, $stateParams, $ionicActionSheet) {

                var groupId = $stateParams.groupId;
                var scheduleId = $stateParams.scheduleId;
                $scope.groupId = groupId;
                $scope.scheduleId = scheduleId;
                $scope.createGroupSchedule = function (groupId, schedule) {
                    createGroupSchedule(groupId, schedule);
                };

                $scope.reply = function () {
                    // Show the action sheet
                    var hideSheet = $ionicActionSheet.show({
                        buttons: [
                            {text: '<b>Accept</b>'}

                        ],
                        destructiveText: 'Decline',
                        titleText: 'Your reply to this schedule',
                        cancelText: 'Cancel',
                        cancel: function () {
                            console.log('canceled');
                        },
                        buttonClicked: function (index) {
                            if (0 === index) {
                                rest.acceptGroupSchedule(groupId, scheduleId)
                                    .success(function () {
                                        getGroupSchedule(groupId, scheduleId);
                                    }).error(function (error) {
                                    $scope.status = 'Unable to accept schedules ' + error.message;
                                });
                            }
                            return true;
                        },
                        destructiveButtonClicked: function () {
                            rest.declineGroupSchedule(groupId, scheduleId)
                                .success(function () {
                                    getGroupSchedule(groupId, scheduleId);
                                }).error(function (error) {
                                $scope.status = 'Unable to decline schedules ' + error.message;
                            });
                            return true;
                        }
                    });
                };

                if ('app.groups.schedules.index' == $state.current.name) {
                    getGroupSchedules(groupId);
                }

                if ('app.groups.schedules.overview' == $state.current.name) {
                    getGroupSchedule(groupId, scheduleId);
                }


                function getGroupSchedules(groupId) {

                    rest.getGroupSchedules(groupId)
                        .success(function (data) {
                            $scope.schedules = data;
                        })
                        .error(function (error) {
                            $scope.status = 'Unable to get schedules ' + error.message;
                        });
                }

                function getGroupSchedule(groupId, scheduleId) {

                    rest.getGroupSchedule(groupId, scheduleId)
                        .success(function (data) {
                            console.log(data);
                            $scope.schedule = data;
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