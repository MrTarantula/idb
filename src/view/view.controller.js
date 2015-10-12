(function () {
    'use strict';

    angular.module('ideabox')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$scope', '$stateParams'];

    function ViewController($scope, $stateParams) {
        $scope.idea = $stateParams;

        $scope.number = 5;
        $scope.getNumber = function (num) {
            return new Array(num);
        };
    }
})();
