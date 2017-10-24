(function () {
    'use strict';

    var router = angular.module('blocks.router', [
        'ui.router'
    ])

        .config([
            '$stateProvider',
            '$urlRouterProvider',

            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/favorites');
            }
        ])
        .run(['$rootScope', '$state',  '$stateParams', '$location', '$injector',
            function ($rootScope, $state, $stateParams, $location, $injector) {
                var stateChangeStartHandler = function (ev, toState, toParams, fromState, fromParams) {

                };

                $rootScope.$on('$stateChangeStart', stateChangeStartHandler);
            }]);
})();
