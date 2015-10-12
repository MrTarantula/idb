(function () {
    'use strict';

    angular.module('ideabox')
        .controller('DeleteIdeaController', DeleteIdeaController);

    DeleteIdeaController.$inject = ['$scope', '$mdDialog'];

    function DeleteIdeaController($scope, $mdDialog) {

        $scope.deleteIdea = function (id) {
            $scope.ideas.remove(id);
            $mdDialog.hide();
        };
    }
})();
