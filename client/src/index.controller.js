(function () {
    'use strict';

    angular
        .module('ideabox')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', '$mdDialog', 'api', '$auth'];

    function IndexController($scope, $mdDialog, api, $auth) {
        var vm = this;

        $scope.ideas = api.getIdeas();

        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        $scope.like = function () {
            /********************UPDATE LIKES**************************/
        };


        //dialogs

        $scope.loginDialog = function () {

            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                hasBackdrop: false,
                templateUrl: 'action/login.ng.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            });
        };

        $scope.logoutDialog = function () {
            $mdDialog.show({
                scope: $scope,
                clickOutsideToClose: true,
                preserveScope: true,
                hasBackdrop: false,
                templateUrl: 'action/logout.ng.html',
                controller: 'LogoutController',
                controllerAs: 'logoutCtrl'
            });
        };

        $scope.addNewIdeaDialog = function () {
            /* if (!$rootScope.currentUser) {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                hasBackdrop: false,
                templateUrl: 'action/error.ng.html',
                controller: 'ErrorController'
            });
             } else {*/

            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                hasBackdrop: false,
                templateUrl: 'action/add.ng.html',
                controller: 'AddIdeaController',
                controllerAs: 'addCtrl'
            });
        };
    }
})();
