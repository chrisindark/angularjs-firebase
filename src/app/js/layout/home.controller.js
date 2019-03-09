(function () {
    angular
        .module('fireslack.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', 'Authentication', 'Profiles'];

    function HomeController($scope, $state, Authentication, Profiles) {
        var vm = this;

        Authentication.$onAuthStateChanged(function (user) {
            if (user) {
                vm.user = user;
                getProfile();
            } else {
                $state.go('auth');
            }
        });


        vm.logout = function () {
            Authentication.$signOut()
                .then(function (res) {
                    console.log(res);
                });
        };

        function getProfile() {
            Profiles.getProfileById(vm.user.uid)
                .then(function (res) {
                    vm.userProfile = res;
                });
        }
    }

})();
