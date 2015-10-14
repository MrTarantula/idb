(function () {
    'use strict';

    angular.module('ideabox')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', '$mdDialog'];

    function SignupController($scope) {
        var vm = this;

        vm.signup = function () {
            if ($scope.user === null) {
                $scope.regError = "User Name, Email, and Password required";
            } else if (!$scope.user.name) {
                $scope.regError = "User Name required";
            } else if (!$scope.user.email) {
                $scope.regError = "Email required";
            } else if (!$scope.user.password) {
                $scope.regError = "Password required";
            } else {
                /***************************CREATE USER AND LOG IN********************/
                $scope.user = null;
                $scope.close();
                $scope.regError = null;
            }
        };
    }
})();
