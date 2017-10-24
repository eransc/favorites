(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular modules


        // Custom modules

        // Features
        'app.layout',
        'app.services',

        // 3rd Party modules
        'LocalStorageModule',

        'ui.bootstrap'

    ]);

    app.config(['$compileProvider', '$httpProvider', 'localStorageServiceProvider',
        function ($compileProvider, $httpProvider, localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('favorites');

            //disable IE ajax request caching
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.common = {};
            }
            $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
            $httpProvider.defaults.headers.common.Pragma = "no-cache";
            $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";

            //Combine multiple $http responses into one $digest
            $httpProvider.useApplyAsync(true);

            //For Production use only
            $compileProvider.debugInfoEnabled(false);

        }
    ]).run(['$rootScope','$stateParams', '$state', function($rootScope, $stateParams, $state){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$state.transitionTo('favorites');
    }]);

}());
