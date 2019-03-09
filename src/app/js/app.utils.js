(function () {
    angular
        .module('fireslack.utils')
        .run(run);

    run.$inject = ['$rootScope', '$state', 'Authentication'];

    function run($rootScope, $state, Authentication) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('start', toState.name);
            // $rootScope.showLoader = true;
            // if (toState.name === 'home') {
            //     Authentication.$requireSignIn()
            //         .then(function (res) {
            //             $state.go('channels');
            //         })
            //         .catch(function (error) {
            //             $state.go('auth');
            //         });
            // }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            console.log('success', toState.name);
            // $rootScope.showLoader = false;
            // if (toState.resolve) {
            // }
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
            console.log('error', toState.name);
            // $rootScope.showLoader = false;
        });

        console.log('Angular app started');
    }

})();
