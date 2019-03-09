(function () {
    angular
        .module('fireslack.controllers')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['$scope', '$state', '$stateParams', 'Authentication',
        'Profiles', 'Channels', 'Messages'];

    function MessagesController($scope, $state, $stateParams, Authentication,
                                Profiles, Channels, Messages) {

        var vm = this;

        function activate() {
            if ($stateParams.uid) {
                getReceiverProfile($stateParams.uid);
            } else {
                // getChannelProfile($stateParams.channelId);
            }
        }

        function getReceiverProfile(uid) {
            Profiles.getProfileById(uid)
                .then(function (response) {
                    vm.receiverProfile = response;
                    vm.channelName = '@' + response.displayName;
                    getDirectMessages();
                });
        }

        // function getChannelProfile(uid) {
        //     Channels.getChannelById(uid).then(function(response) {
        //         vm.channelName = '#' + response.name;
        //         vm.channel = response;
        //         getChannelMessages();
        //     });
        // }

        function getProfile() {
            Profiles.getProfileById(vm.user.uid)
                .then(function(response) {
                    vm.senderProfile = response;
                    activate();
                });
        }

        function getDirectMessages() {
            vm.messages = Messages.forUsers(vm.senderProfile.$id, vm.receiverProfile.$id);
            vm.messages.$loaded()
                .then(function () {
                    vm.messages.forEach(function (value) {
                        // console.log(value);
                        Profiles.getDisplayName(value.uid)
                            .then(function (displayName) {
                                // console.log(res);
                                value.displayName = displayName;
                            });
                    });
            });

            vm.messages.$watch(function(event) {
                // console.log(event);
                Messages.getMessageById(event.key)
                    .then(function (message) {
                        // console.log(message);
                        Profiles.getDisplayName(message.uid)
                            .then(function (displayName) {
                                // console.log(displayName);
                                // message.displayName = displayName;
                                vm.messages.$loaded()
                                    .then(function () {
                                        vm.messages.forEach(function (value) {
                                            // console.log(value, displayName, message);
                                            if (value.uid === message.uid) {
                                                value.displayName = displayName;
                                            }
                                        });
                                    });
                            });

                    })
            });
        }

        function getChannelMessages() {
            // Messages.forChannels(vm.channelName.$id).$loaded().then(function(response) {
            //     vm.messages = response;
            //     console.log(vm.messages);
            // });
        }

        vm.message = '';
        vm.sendMessage = function () {
            if (vm.message.trim().length > 0) {
                var messageData = {
                    // senderUid: vm.senderProfile.$id,
                    // receiverUid: vm.receiverProfile.$id,
                    uid: vm.senderProfile.$id,
                    body: vm.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                };

                Messages.addMessage(vm.senderProfile.$id, vm.receiverProfile.$id, messageData)
                    .then(function (res) {
                        vm.message = '';
                    });
            }
        };

        // vm.getDisplayName = function (message) {
        //     console.log(Profiles.getDisplayName(message.uid));
        //         // .then(function (res) {
        //         //     // return res;
        //         // });
        // };

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
