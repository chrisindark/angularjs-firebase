angular
    .module('fireslack.services')
    .factory('Messages', Messages);

Messages.$inject = ['$firebaseArray', '$firebaseObject'];

function Messages($firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref();
    var channelMessagesRef = ref.child('channelMessages');
    var userMessagesRef = ref.child('directMessages');
    var Messages = {};

    Messages.forChannel = function (channelId) {
        return $firebaseArray(channelMessagesRef.child(channelId));
    };

    Messages.forUsers = function (uid1, uid2) {
        Messages.path = uid1 < uid2
            ? uid1 + '/' + uid2
            : uid2 + '/' + uid1;
        return $firebaseArray(userMessagesRef.child(Messages.path));
    };

    Messages.addMessage = function (uid1, uid2, messageData) {
        return Messages.forUsers(uid1, uid2).$add(messageData);
    };

    Messages.removeMessage = function () {
        // do something
    };

    Messages.getMessageById = function (uid) {
        return $firebaseObject(userMessagesRef.child(Messages.path).child(uid))
            .$loaded();
    };

    return Messages;
}
