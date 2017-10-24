(function () {
    'use strict';

    var module = angular.module('app.layout');

    module.config([
        '$stateProvider',

        function ($stateProvider) {
            $stateProvider
                .state('favorites', {
                    url: '/favorites',
                    views: {
                        'container@': {
                            template:
                            '<favorites/>'
                        }
                    }
                })
                .state('logs', {
                    url: '/logs',
                    views: {
                        'container@': {
                            template:
                            '<actionlog/>'
                        }
                    }
                });
                
        }
    ]);
}());
