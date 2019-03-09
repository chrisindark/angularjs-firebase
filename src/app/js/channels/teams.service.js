angular
    .module('fireslack.services')
    .factory('Teams', Teams);

Teams.$inject = ['$firebaseArray', '$firebaseObject'];

function Teams($firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref();
    var teamsRef = ref.child('teams');

    return Teams;
}
