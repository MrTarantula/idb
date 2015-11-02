(function () {
    'use strict';

    angular.module('ideabox')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$window', '$location', '$rootScope', '$auth'];

    function LoginController($scope, $window, $location, $rootScope, $auth) {
        var vm = this;

        vm.login = function () {
            $auth.authenticate('google')
                .then(function (response) {
                    $window.localStorage.currentUser = JSON.stringify(response.data.user);
                    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    $scope.close();
                })
                .catch(function (response) {
                    console.log(response.data);
                    $scope.loginError = response.data.message;
                });
        };
    }
})();
