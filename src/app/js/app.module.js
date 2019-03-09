(function () {
    /**
     * @name fireslack
     * @description fireslack
     */
    angular
        .module('fireslack', [
            'ngAnimate',
            'ngCookies',
            'ngMessages',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'ui.bootstrap',
            'firebase',
            'angular-md5',
            'fireslack.config',
            'fireslack.routes',
            'fireslack.utils',
            'fireslack.services',
            'fireslack.controllers',
            'fireslack.directives'
        ]);

    angular
        .module('fireslack.config', []);

    angular
        .module('fireslack.routes', []);

    angular
        .module('fireslack.utils', []);

    angular
        .module('fireslack.services', []);

    angular
        .module('fireslack.controllers', []);

    angular
        .module('fireslack.directives', []);

})();
