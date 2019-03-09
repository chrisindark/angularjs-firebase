(function () {
    angular
        .module('fireslack.controllers')
        .controller('ChannelsController', ChannelsController);

    ChannelsController.$inject = ['$scope', '$state', 'Authentication',
        'Profiles', 'Channels'];

    function ChannelsController($scope, $state, Authentication,
                                Profiles, Channels) {
        var vm = this;

        vm.channels = Channels.all;
        vm.profiles = Profiles.all;

        vm.createChannel = function () {
            Channels.validateChannelName(vm.newChannel.name)
                .then(function (res) {
                    if (res) {
                        vm.error = undefined;

                        vm.newChannel.adminUid = vm.user.uid;
                        Channels.createChannel(vm.newChannel)
                            .then(function (res1) {
                                console.log(res1);
                            });
                    } else {
                        vm.error = {
                            message: 'Channel name already taken. Please enter another one.'
                        };
                        $scope.$apply();
                    }
                });
        //     Channels.all.$add(vm.newChannel).then(function (response) {
        //         console.log(response);
        //         // $state.go('channels.messages', {channelId: ref.key()});
        //     }).catch(function(response) {
        //         console.log(response);
        //     });
        };

        // vm.test = function() {
        //     console.log(vm.members);
        //     for(var key in vm.members) {
        //         if (vm.members[key]) {
        //             var a = Channels.channelMembers().$add(key);
        //             console.log(a);
        //         }
        //     }
        // };

        function getProfile() {
            Profiles.getProfileById(vm.user.uid)
                .then(function (res) {
                // if(!res.displayName){
                //     $state.go('profile');
                // }
                vm.profile = res;
                // Profiles.setOnline(vm.profile.$id);
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
