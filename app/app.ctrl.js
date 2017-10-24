(function () {
    'use strict';

    var controllerId = 'AppCtrl';
    angular.module('app.layout').controller(controllerId,
        ['$rootScope', '$scope', '$stateParams', '$state',
             AppCtrl]);

    function AppCtrl($rootScope, $scope, $state, $stateParams) {

    }
})();
