(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('auth', ['$q', '$http', 'AUTH_ENDPOINT', function ($q, $http, AUTH_ENDPOINT) {

            var auth = {};
            var localTokenKey = 'auth-token';
            var localUserId = 'userid';
            var localUserEmail = 'email';
            var localUserName = 'username';

            var userIsAuthenticated = false;
            var authToken;

            function loadUserCredentials() {
                var token = window.localStorage.getItem(localTokenKey);
                if (token) {
                    useCredentials(token);
                }
            }

            function storeUserCredentials(data) {
                window.localStorage.setItem(localTokenKey, data.authToken);
                window.localStorage.setItem(localUserId, data.userid);
                window.localStorage.setItem(localUserEmail, data.email);
                window.localStorage.setItem(localUserName, data.username);
                useCredentials(data.authToken);
            }

            function getUserInfo() {

                var user = {};

                user.id = window.localStorage.getItem(localUserId);
                user.name = window.localStorage.getItem(localUserName);
                user.email = window.localStorage.getItem(localUserEmail);

                return user;

            }

            function useCredentials(token) {
                userIsAuthenticated = true;
                authToken = token;
                // set the token as header for requests
                $http.defaults.headers.common.Authorization = authToken;
                $http.defaults.headers.common['X-Auth-Token'] = authToken;
            }

            function destroyUserCredentials() {
                authToken = undefined;
                userIsAuthenticated = false;
                $http.defaults.headers.common.Authorization = undefined;
                window.localStorage.removeItem(localTokenKey);
            }

            var register = function (user) {
                // register is done via iframe on symfony2
            };

            var login = function (username, password) {
                return $q(function (resolve, reject) {
                    var login = 'username=' + username + '&password=' + password;
                    console.log(login);

                    $http.post(AUTH_ENDPOINT.loginUrl, login).then(function (result) {
                        if (200 === result.status) {
                            console.log(result);
                            storeUserCredentials(result.data);
                            resolve(result.statusText);
                        } else {
                            reject(result.statusText);
                        }
                    }, function(result) {
                        reject(result.statusText);
                    });
                });
            };

            var logout = function () {
                destroyUserCredentials();
            };

            var isAuthenticated = function () {
                return userIsAuthenticated;
            };

            loadUserCredentials();

            return {
                login: login,
                register: register,
                logout: logout,
                getUserInfo: getUserInfo,
                isAuthenticated: isAuthenticated
            };

        }])

        // interceptor for auth
        .factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        }]);
})();
