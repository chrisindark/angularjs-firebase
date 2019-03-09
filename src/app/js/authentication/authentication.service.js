angular
    .module('fireslack.services')
    .factory('Authentication', Authentication);

Authentication.$inject = ['$firebaseAuth', '$state', 'Profiles'];

function Authentication($firebaseAuth, $state, Profiles) {
    var Authentication = $firebaseAuth();

    Authentication.$onAuthStateChanged(function (user) {
        // console.log(user);
        //     if (user) {
        //         $state.go('channels')
        //     }
    //     if (user) {
    //         // firebase.database().goOnline();
    //     } else {
    //         if(Profiles.onlineObject) {
    //             Profiles.setOffline().then(function(response) {
    //                 // firebase.database().goOffline();
    //                 $window.location.reload();
    //             });
    //         }
    //     }
    });

    return Authentication;

}
