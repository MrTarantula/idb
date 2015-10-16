(function () {
    'use strict';

    angular
        .module('ideabox')
        .factory('api', ['$resource', function ($resource) {
                return $resource(
                    '/api/ideas/:id', {}, {
                        'getIdeas': {
                            method: 'GET',
                            isArray: true
                        },
                        'saveIdea': {
                            method: 'POST'
                        },
                        'getIdea': {
                            method: 'GET',
                            params: {
                                id: '@id'
                            }
                        },
                        'login': {
                            method: 'POST',
                            url: '/login'
                        },
                        'register': {
                            method: 'POST',
                            url: '/register'
                        },
                        'logout': {
                            method: 'GET',
                            url: '/logout'
                        },
                        'getLogin': {
                            method: 'GET',
                            url: '/getlogin'
                        }
                    });
            }
            ]);
})();
