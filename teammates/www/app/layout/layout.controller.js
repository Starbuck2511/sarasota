(function () {
    'use strict';
    angular.module('app.layout', [])

        .controller('LayoutController', ['$scope','$state', function($scope, $state) {

            $scope.tab = function (uiSref) {
                $state.go(uiSref);
            }
        }]);
})();
