(function () {
    'use strict';
    angular.module('app.auth', [])

        .controller('AuthController', ['$scope', 'auth',
            function ($scope, auth) {

                $scope.data = {};

                $scope.login = function() {
                    var username = $scope.data.username;
                    var password = $scope.data.password;

                    auth.login(username, password).then(function(){
                        console.log('Auth success');
                    },function(){
                        console.log('Auth failure');
                    });
                };
            }]);
})();
