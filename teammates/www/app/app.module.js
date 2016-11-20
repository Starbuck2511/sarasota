// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
(function () {
    'use strict';

    angular.module('app', [

        /* ionic */
        'ionic',

        /* 3rd party modules */
        'ion-datetime-picker',

        /* shared modules */
        'app.core',


        /* feature modules */
        'app.layout',
        'app.common',
        'app.auth',
        'app.rest',
        'app.user',
        'app.group',
        'app.schedule'


    ])


        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider

                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'app/layout/menu.html',
                    controller: 'LayoutController'
                })

                .state('app.home', {
                    url: '/home',
                    views: {
                        'menu-content': {
                            templateUrl: 'app/common/home.html',
                            controller: 'CommonController'
                        }
                    }
                })

                .state('app.login', {
                    url: '/login',
                    views: {
                        'menu-content': {
                            templateUrl: 'app/auth/login.html',
                            controller: 'AuthController'
                        }
                    }
                })

                .state('app.register', {
                    url: '/register',
                    views: {
                        'menu-content': {
                            templateUrl: 'app/auth/register.html',
                            controller: 'AuthController'
                        }
                    }
                })

                .state('app.account', {
                    url: '/account',
                    views: {
                        'menu-content': {
                            templateUrl: 'app/user/account.html',
                            controller: 'UserController'
                        }
                    }
                })

                .state('app.about', {
                    url: '/about',
                    views: {
                        'menu-content': {
                            templateUrl: 'app/common/about.html',
                            controller: 'CommonController'
                        }
                    }
                })

                .state('app.groups', {
                    abstract: true,
                    url: '/groups',
                    views: {
                        'menu-content': {
                            template: '<ion-nav-view name="groups-content"></ion-nav-view>'

                        }
                    }
                })

                .state('app.groups.index', {
                    url: '/index',
                    views: {
                        'groups-content': {
                            templateUrl: 'app/group/groups.html',
                            controller: 'GroupController'

                        }
                    }

                })


                .state('app.groups.create', {
                    url: '/create',
                    views: {
                        'groups-content': {
                            templateUrl: 'app/group/group-create.html',
                            controller: 'GroupController'
                        }
                    }
                })

                .state('app.groups.overview', {
                    url: '/:groupId/overview',
                    views: {
                        'groups-content': {
                            templateUrl: 'app/group/group-overview.html',
                            controller: 'GroupController'

                        }
                    },
                    params: {
                        groupId: null
                    }


                })

                .state('app.groups.schedules', {
                    abstract: true,
                    url: '/:groupId/schedules',
                    views: {
                        'groups-content': {
                            template: '<ion-nav-view name="schedules-content">zzz</ion-nav-view>'

                        }
                    },
                    params: {
                        groupId: null
                    }
                })

                .state('app.groups.schedules.index', {
                    url: '/index',
                    views: {
                        'schedules-content': {
                            templateUrl: 'app/schedule/schedules.html',
                            controller: 'ScheduleController'

                        }
                    },
                    params: {
                        groupId: null
                    }

                })

                .state('app.groups.schedules.overview', {
                    url: '/:scheduleId/overview',
                    views: {
                        'schedules-content': {
                            templateUrl: 'app/schedule/schedule-overview.html',
                            controller: 'ScheduleController'

                        }
                    },
                    params: {
                        scheduleId: null
                    }

                })

                .state('app.groups.schedules.create', {
                    url: '/create',
                    views: {
                        'schedules-content': {
                            templateUrl: 'app/schedule/schedule-create.html',
                            controller: 'ScheduleController'
                        }
                    }
                })

            ;

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');

        })
        .config(authConfig)
        .config(loadingScreenConfig)
        .run(function ($ionicPlatform, $rootScope, $state, $window, auth, AUTH_EVENTS, $ionicLoading) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });

            // auth goes here ...
            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
                if (!auth.isAuthenticated()) {
                    //console.log('next name '+ next.name);
                    //console.log('next params ' + nextParams);
                    //console.log('from state ' + fromState);
                    console.log('auth events  ' + AUTH_EVENTS);

                    if (next.name !== 'app.login' && next.name !== 'app.register' && next.name !== 'app.home') {
                        event.preventDefault();
                        $state.go('app.register');
                        //console.log('go to login ...');
                    }
                }
            });

            // loading screen goes here ...
            $rootScope.$on('loading:show', function() {
                $ionicLoading.show({template: '<p>Loading...</p><ion-spinner></ion-spinner>'});
            });

            $rootScope.$on('loading:hide', function() {
                $ionicLoading.hide();
            });

            // hook not found
            $rootScope.$on('$stateNotFound',
                function (event, unfoundState, fromState, fromParams) {
                    console.log(unfoundState.to); // "lazy.state"
                    console.log(unfoundState.toParams); // {a:1, b:2}
                    console.log(unfoundState.options); // {inherit:false} + default options
                });

            // hook success
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    // success here
                    // display new view from top
                    $window.scrollTo(0, 0);
                });
        });

    // auth interceptor configuration
    authConfig.$inject = ['$httpProvider'];
    function authConfig($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
        var localTokenKey = 'auth-token';
        var token = window.localStorage.getItem(localTokenKey);
        $httpProvider.defaults.headers.common['X-Auth-Token'] = token;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    }

    // global loading screen configuration
    loadingScreenConfig.$inject = ['$httpProvider'];
    function loadingScreenConfig($httpProvider) {
        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show');
                    return config;
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    return response;
                },
                responseError: function(rejection) {
                    $rootScope.$broadcast('loading:hide');
                    return rejection;
                }
            }
        })
    }
})();
