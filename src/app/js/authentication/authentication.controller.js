angular
    .module('fireslack.controllers')
    .controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope', '$state', 'Authentication'];

function AuthenticationController($scope, $state, Authentication) {
    console.log('AuthenticationController started.');
    var vm = this;

    vm.isSubmitted = false;

    vm.login = function () {
        vm.isSubmitted = true;
        Authentication.$signInWithEmailAndPassword(vm.email, vm.password)
            .then(function (response) {
                vm.isSubmitted = false;
                console.log(response);
            }).catch(function (error) {
                vm.isSubmitted = false;
                vm.error = error;
            });
    };

    /*
     This function both creates the new user and authenticates as the new user.
     */
    vm.register = function () {
        vm.isSubmitted = true;
        Authentication.$createUserWithEmailAndPassword(vm.email, vm.password)
            .then(function (response) {
                vm.isSubmitted = false;
                console.log(response);
            }).catch(function (error) {
                vm.isSubmitted = false;
                vm.error = error;
            });
    };

    Authentication.$onAuthStateChanged(function (user) {
        if (user) {
            console.log('authCtrl', user);
            if (user.displayName) {
                // $state.go('channels');
            } else {
                $state.go('profile');
            }
        }
    });

}
