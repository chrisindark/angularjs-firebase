(function () {
    angular
        .module('fireslack.directives')
        .directive('mySidebarDir', mySidebarDir);

    function mySidebarDir() {
        return {
            // restrict: 'A',
            // scope: {},
            link: function(scope, element, attrs) {
                element.on('click', function(event) {
                    // adding css for hamburger button
                    if ($('#sidebar-toggle').hasClass('active')) {
                        $('#sidebar-toggle').removeClass('active');
                    } else {
                        $('#sidebar-toggle').addClass('active');
                    }

                    // adding css for sliding sidebar into view
                    if ($('#side-bar').hasClass('slide-left')) {
                        $('#side-bar').removeClass('slide-left');
                        $('#main-bar').addClass('slide-right');
                        $('body').addClass('overflow-hidden');
                    } else {
                        $('#side-bar').addClass('slide-left');
                        $('#main-bar').removeClass('slide-right');
                        $('body').removeClass('overflow-hidden');
                    }
                });
            }
        };
    }

})();
