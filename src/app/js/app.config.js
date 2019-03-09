(function () {
    angular
        .module('fireslack.config')
        .config(config);

    config.$inject = ['$httpProvider', '$locationProvider', '$compileProvider',
        '$qProvider'];

    // @name config
    // @desc Add HTTP interceptors, Enable HTML5 routing
    function config($httpProvider, $locationProvider, $compileProvider,
                    $qProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        var firebaseConfig = {
            apiKey: 'AIzaSyAye6sCj3C-aaElzGMImr3c9jk-xWojp7g',
            authDomain: 'ultimate-life-chris.firebaseapp.com',
            databaseURL: 'https://ultimate-life-chris.firebaseio.com/',
            projectId: 'ultimate-life-chris',
            storageBucket: 'ultimate-life-chris.appspot.com',
            messagingSenderId: '307738501047'
        };
        firebase.initializeApp(firebaseConfig);

        $compileProvider.debugInfoEnabled(false);
        $qProvider.errorOnUnhandledRejections(false);
    }

})();
