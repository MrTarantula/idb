(function () {
    'use strict';

    angular
        .module('ideabox')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', '$rootScope', '$mdDialog', 'api'];

    function IndexController($scope, $rootScope, $mdDialog, api) {
        var vm = this;

        $scope.ideas = api.getIdeas.query();

        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
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

        $scope.signupDialog = function () {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                hasBackdrop: false,
                templateUrl: 'action/signup.ng.html',
                controller: 'SignupController',
                controllerAs: 'signupCtrl'
            });
        };

        $scope.addNewIdeaDialog = function () {
            if (!$rootScope.currentUser) {
                $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    hasBackdrop: false,
                    templateUrl: 'action/error.ng.html',
                    controller: 'ErrorController'
                });
            } else {

                $mdDialog.show({
                    scope: $scope,
                    preserveScope: true,
                    hasBackdrop: false,
                    templateUrl: 'action/add.ng.html',
                    controller: 'AddIdeaController',
                    controllerAs: 'addCtrl'
                });
            }
        };
    }
})();
