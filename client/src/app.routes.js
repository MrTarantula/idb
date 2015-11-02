(function () {

    'use strict';

    angular.
    module('ideabox')
        .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
            function ($urlRouterProvider, $stateProvider, $locationProvider) {

                $locationProvider.html5Mode(true);

                $stateProvider
                    .state('ideas', {
                        url: '/',
                        templateUrl: 'home/home.ng.html',
                        controller: 'HomeController'
                    })
                    .state('view', {
                        url: '/view/:id',
                        templateUrl: 'view/view.ng.html',
                        controller: 'ViewController'
                    });

                $urlRouterProvider.otherwise("/");
         }]);
})();
