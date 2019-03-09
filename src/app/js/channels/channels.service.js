angular
    .module('fireslack.services')
    .factory('Channels', Channels);

Channels.$inject = ['$firebaseArray', '$firebaseObject'];

function Channels($firebaseArray, $firebaseObject) {
    var ref = firebase.database().ref();
    var channelsRef = ref.child('Channels');
    var Channels = {};

    Channels.all = $firebaseArray(channelsRef);

    Channels.createChannel = function (channel) {
        return Channels.all.$add(channel);
    };

    Channels.validateChannelName = function(channelName) {
        var queryset = channelsRef.orderByChild('name')
            .equalTo(channelName);
        return queryset.once('value')
            .then(function (snapshot) {
                // channelName already exists, ask user for a different name
                // channelName does not yet exist, go ahead and add new channel
                return !snapshot.val();
            });
    };

    Channels.removeChannel = function (channelId) {
        return channelsRef.child(channelId).$remove();
    };

    Channels.channelMembers = function(channelId, uid) {
        var channelMembersRef = channelsRef.child(channelId)
            .child('members');
        return $firebaseArray(channelMembersRef);
    };

    Channels.addMember = function(channelId, uid) {
        var channelMembersRef = channelsRef.child(channelId)
            .child('members');
        return channelMembersRef.$add(uid);
    };

    Channels.removeMember = function(channelId, uid) {
        var channelMembersRef = channelsRef.child(channelId)
            .child('members');
        return $firebaseObject(channelMembersRef.child(uid))
            .$remove();
    };

    Channels.getChannelById = function (channelId) {
        return $firebaseObject(channelsRef.child(channelId))
            .$loaded();
    };

    return Channels;
}
