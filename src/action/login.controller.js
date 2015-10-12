(function () {
    'use strict';

    angular.module('ideabox')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$mdDialog'];

    function LoginController($scope) {
        var vm = this;

        vm.login = function () {
            if ($scope.user === null) {
                $scope.loginError = "User Name and Password required";
            } else if (!$scope.user.name) {
                $scope.loginError = "User Name required";
            } else if (!$scope.user.password) {
                $scope.loginError = "Password required";
            } else {
                /************************LOGIN*****************************/
            }
        };
    }
})();
