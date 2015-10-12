(function () {
    'use strict';

    angular.module('ideabox')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$mdDialog'];

    function HomeController($scope, $mdDialog) {

        var vm = this;

        $scope.deleteIdeaDialog = function () {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                hasBackdrop: false,
                templateUrl: 'action/delete.ng.html',
                controller: 'DeleteIdeaController'
            });
        };
    }
})();
