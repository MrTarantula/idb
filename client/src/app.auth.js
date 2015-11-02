(function () {
    'use strict';

    angular.
    module('ideabox')
        .config(function ($authProvider) {
            $authProvider.google({
                clientId: '822223737759-q3lid0cah5isnt0jcbcbd1e9smacicie.apps.googleusercontent.com'
            });
        });
})();
