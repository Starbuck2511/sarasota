(function () {
    'use strict';
    angular.module('app.auth', [])

        .controller('AuthController', ['$scope', 'auth', '$state',
            function ($scope, auth, $state) {

                $scope.data = {};

                $scope.login = function() {
                    var username = $scope.data.username;
                    var password = $scope.data.password;

                    auth.login(username, password).then(function(){
                        console.log('Auth success');
                        $state.go('app.home');
                    },function(){
                        console.log('Auth failure');
                        $state.go('app.register');
                    });
                };
            }]);
})();
