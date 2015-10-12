(function () {
    'use strict';

    angular.module('ideabox')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$scope', '$mdDialog'];

    function LogoutController($scope) {
        var vm = this;

        vm.logout = function () {
            /***************LOGUT******************************/
            $scope.close();
        };
    }
})();
