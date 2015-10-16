(function () {
    'use strict';

    angular.module('ideabox')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'api'];

    function LoginController($scope, api) {
        var vm = this;

        vm.login = function () {
            if ($scope.user === null) {
                $scope.loginError = "User Name and Password required";
            } else if (!$scope.user.name) {
                $scope.loginError = "User Name required";
            } else if (!$scope.user.password) {
                $scope.loginError = "Password required";
            } else {
                api.login({
                        username: $scope.user.name,
                        password: $scope.user.password
                    }, function (successData) {
                        $rootScope.currentUser = successData;
                    },
                    function (errorData) {
                        $scope.loginError = errorData.message;
                    }
                );
            }
        };
    }
})();
