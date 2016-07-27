(function () {
    'use strict';

    angular
        .module('app')
        .constant('AUTH_EVENTS', {
            notAuthenticated: 'auth-not-authenticated'
        })
        .constant('AUTH_ENDPOINT', {
            loginUrl: 'http://siesta-key.de/app_dev.php/login_check',
            signupUrl: 'http://siesta-key.de/app_dev.php/register/'
        })
        .constant('API_ENDPOINT', {
            url: 'http://siesta-key.de/app_dev.php/api'
            //  For a simulator use: url: 'http://127.0.0.1:8080/api'
        });
})();