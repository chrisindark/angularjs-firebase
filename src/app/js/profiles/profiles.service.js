angular
    .module('fireslack.services')
    .factory('Profiles', Profiles);

Profiles.$inject = ['$firebaseArray', '$firebaseObject'];

function Profiles($firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref();
    var profileRef = ref.child('Profiles');
    var connectedRef = ref.child('.info/connected');
    var Profiles = {};
    // Profiles.onlineObject to store the object of the present online device.

    Profiles.all = $firebaseArray(profileRef);

    Profiles.validateDisplayName = function(displayName) {
        var queryset = profileRef.orderByChild('displayName')
            .equalTo(displayName);
        return queryset.once('value')
            .then(function (snapshot) {
                // username already exists, ask user for a different name
                // username does not yet exist, go ahead and add new user
                return !snapshot.val();
            });
    };

    Profiles.updateProfile = function (uid, userData) {
        return profileRef.child(uid)
            .update(userData)
            .then(function (res) {
                return uid;
            });
    };

    Profiles.getProfileById = function (uid) {
        return $firebaseObject(profileRef.child(uid))
            .$loaded();
    };

    Profiles.getProfileByDisplayName = function (displayName) {
        var queryset = profileRef.orderByChild('displayName')
            .equalTo(displayName);
        return queryset.once('value')
            .then(function (snapshot) {
                return snapshot.val();
            });
    };

    Profiles.getDisplayName = function (uid) {
        return Profiles.getProfileById(uid)
            .then(function (response) {
                return response.displayName;
            });
    };

    Profiles.setOnline = function(uid) {
        var onlineRef = profileRef.child(uid)
            .child('online');
        // var lastOnlineRef = profileRef.child(uid)
        //     .child('lastOnline');
        // connectedRef.on('value', function(snapshot) {
        //     if (snapshot.val() === true) {
        //         onlineRef.push(true)
        //             .then(function(response) {
        //                 Profiles.onlineObject = $firebaseObject(response);
        //                 response.onDisconnect().remove();
        //             });
        //         lastOnlineRef.onDisconnect()
        //             .set(firebase.database.ServerValue.TIMESTAMP);
        //     }
        // });
    };

    Profiles.setOffline = function() {
        // return Profiles.onlineObject.$remove();
    };

    return Profiles;
}
