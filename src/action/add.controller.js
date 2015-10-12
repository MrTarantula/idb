(function () {
    'use strict';

    angular.module('ideabox')
        .controller('AddIdeaController', AddIdeaController);

    AddIdeaController.$inject = ['$scope', '$rootScope'];

    function AddIdeaController($scope, $rootScope) {
        var vm = this;

        vm.addIdea = function (idea) {
            var newIdea = {
                userId: $rootScope.currentUser._id,
                title: idea.title,
                desc: idea.desc,
                likes: 0,
                timestamp: (new Date()).getTime(),
                comments: {}
            };
            $scope.ideas.push(newIdea);

            console.log('Added idea');
            $scope.newIdea = null;
            $scope.close();
            $scope.ideaError = null;
        };
    }
})();
