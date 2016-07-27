angular.module('app.controllers', [])
    .controller('ShellController', function ($scope) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
    })
    .controller('HomeCtrl', function ($scope) {
    })
    .controller('LoginCtrl', function ($scope) {
    })
    .controller('RegisterCtrl', function ($scope) {
    })
    .controller('AboutCtrl', function ($scope) {
    })

    .controller('GroupsCtrl', function ($scope, Groups) {


        $scope.groups = Groups.all();

    })

    .controller('GroupDetailCtrl', function ($scope, $stateParams, Groups) {
        $scope.group = Groups.get($stateParams.groupId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
