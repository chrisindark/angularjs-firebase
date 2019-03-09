(function () {
    angular
        .module('fireslack.controllers')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$state', 'Authentication', 'Profiles'];

    function ProfileController($scope, $state, Authentication, Profiles) {
        var vm = this;
        vm.profile = {};
        vm.newProfile = {};

        vm.updateProfile = function () {
            if (vm.newProfile.displayName === vm.profile.displayName) {
                vm.error = undefined;
                $state.go('channels');
            }
            Profiles.validateDisplayName(vm.newProfile.displayName)
                .then(function(res) {
                    if (res) {
                        updateProfile();
                    } else {
                        vm.error = {
                            message: 'Display name already taken. Please enter another one.'
                        };
                        $scope.$apply();
                    }
                });
        };

        function updateProfile() {
            Profiles.updateProfile(vm.user.uid, vm.newProfile)
                .then(function (res) {
                    $state.go('channels');
                });
        }

        function getProfile() {
            Profiles.getProfileById(vm.user.uid)
                .then(function(res) {
                if (res.displayName) {
                    vm.profile.displayName = res.displayName;
                    vm.newProfile.displayName = res.displayName;
                }
            });
        }

        Authentication.$onAuthStateChanged(function (user) {
            if (user) {
                vm.user = user;
                getProfile();
            } else {
                $state.go('home');
            }
        });
    }

})();
