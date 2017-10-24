(function () {
    'use strict';

    angular.module('app.layout')
        .component('addeditsite', {
            templateUrl: 'modals/addeditsite/addeditsite.html',
            bindings: {
                modalInstance: '<',
                resolve: '<'
            },
            controller: AddWebsiteCtrl
        });

        AddWebsiteCtrl.$inject = ['$state', '$rootScope', '$scope', 'favoritesService'];

    function AddWebsiteCtrl($state, $rootScope,  $scope, favoritesService) {
        var ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.favoritesService = favoritesService;

        this.$onInit = function () {
            if (ctrl.resolve.website){
                ctrl.website = ctrl.resolve.website;
            }
        };

        ctrl.cancel = function(){
            this.modalInstance.dismiss('cancel');
        };
        ctrl.apply = function(){
            this.favoritesService.addWebsiteOrUpdate(ctrl.website);
            ctrl.$rootScope.$broadcast('ev-sites-changed');
            this.modalInstance.dismiss('cancel');
            //$state.transitionTo('favorites');
        };
    }
})();
