angular
    .module('fireslack.routes')
    .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];
// @name config
// @desc Define valid application states
function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'HomeController',
            controllerAs: 'vm',
            templateUrl: 'app/js/layout/home.html',
            resolve: {
                // checkAuth: ['$state', 'Authentication', function ($state, Authentication) {
                //     Authentication.$requireSignIn()
                //         .then(function (res) {
                //             $state.go('channels');
                //         })
                //         .catch(function (error) {
                //             $state.go('auth');
                //         });
                // }]
            }
        })
        .state('auth', {
            parent: 'home',
            url: '/auth',
            templateUrl: 'app/js/authentication/auth.html'
        })
        .state('login', {
            url: '/login',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            templateUrl: 'app/js/authentication/login.html',
            resolve: {
        //         checkAuth: ['$state', 'Authentication', function($state, Authentication) {
        //             Authentication.$requireSignIn()
        //                 .then(function (user) {
        //                     $state.go('channels');
        //                 })
        //                 .catch(function(error){
        //                     console.log(error);
        //                 });
        //         }]
            }
        })
        .state('register', {
            url: '/register',
            controller: 'AuthenticationController',
            controllerAs: 'vm',
            templateUrl: 'app/js/authentication/register.html',
            resolve: {
            //     requireNoAuth: function($state, Auth) {
            //         return Auth.$requireAuth().then(function(auth) {
            //             $state.go('home');
            //         }, function(error){
            //             return;
            //         });
            //     }
            }
        })
        .state('profile', {
            url: '/profile',
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: 'app/js/profiles/profile.html',
            resolve: {
            //         auth: function ($state, Users, Auth) {
            //             return Auth.$requireAuth().catch(function () {
            //                 $state.go('home');
            //             });
            //         },
            //         profile: function (Users, Auth) {
            //             return Auth.$requireAuth().then(function (auth) {
            //                 return Users.getProfile(auth.uid).$loaded();
            //             });
            //         }
            }
        })
        .state('channels', {
            parent: 'home',
            url: '/channels',
            controller: 'ChannelsController',
            controllerAs: 'vm',
            templateUrl: 'app/js/channels/channels.html',
            resolve: {
        //         channels: function (Channels) {
        //             return Channels.$loaded();
        //         },
        //         profile: function ($state, Auth, Users) {
        //             return Auth.$requireAuth().then(function (auth) {
        //                 return Users.getProfile(auth.uid).$loaded().then(function (profile) {
        //                     if (profile.displayName) {
        //                         return profile;
        //                     } else {
        //                         $state.go('profile');
        //                     }
        //                 });
        //             }, function (error) {
        //                 $state.go('home');
        //             });
        //         }
            }
        })
        .state('channels.create', {
            url: '/create',
            controller: 'ChannelsController',
            controllerAs: 'vm',
            templateUrl: 'app/js/channels/create-channel.html',
            resolve: {
            }
        })
        // .state('channels.settings', {
        //     url: '/{channelId}/settings',
        //     controller: 'ChannelsController',
        //     controllerAs: 'vm',
        //     templateUrl: 'app/templates/channels/settings.html'
        //     // resolve: {
        //     // }
        // })
        // .state('channels.messages', {
        //     url: '/{channelId}/messages',
        //     controller: 'MessagesController',
        //     controllerAs: 'vm',
        //     templateUrl: 'app/templates/channels/messages.html'
        // //     resolve: {
        // //         messages: function ($stateParams, Messages) {
        // //             return Messages.forChannel($stateParams.channelId).$loaded();
        // //         },
        // //         channelName: function ($stateParams, channels) {
        // //             return '#' + channels.$getRecord($stateParams.channelId).name;
        // //         }
        // //     }
        // })
        .state('channels.direct', {
            url: '/messages/{uid}/direct',
            controller: 'MessagesController',
            controllerAs: 'vm',
            templateUrl: 'app/js/channels/messages.html',
            resolve: {
                // checkAuth: ['$state', 'Authentication', function($state, Authentication) {
                //     return Authentication.$requireSignIn()
                //         .then(function (user) {
                //             $state.go('home');
                //         })
                //         .catch(function(error){
                //             console.log(error);
                //         });
                // }]
        //         messages: function ($stateParams, Messages, profile) {
        //             return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
        //         },
        //         channelName: function ($stateParams, Users) {
        //             return Users.all.$loaded().then(function () {
        //                 return '@' + Users.getDisplayName($stateParams.uid);
        //             });
        //         }
            }
        });

    $urlRouterProvider.otherwise('/home');
}
