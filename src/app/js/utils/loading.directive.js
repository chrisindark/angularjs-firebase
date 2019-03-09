angular
    .module('fireslack.directives')
    .directive('loadingSpinner', loadingSpinner);

loadingSpinner.$inject = [];

function loadingSpinner() {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function (scope, element, attrs) {
            scope.$watch('showLoader', function(val) {
                if(val) {
                    $(element).show();
                } else {
                    $(element).hide();
                }
            });
        }
    };
}
