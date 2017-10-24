(function () {
    'use strict';

    angular.module('app.layout')
        .component('removewebsite', {
            templateUrl: 'modals/removewebsite/removewebsite.html',
            bindings: {
                modalInstance: '<',
                resolve: '<'
            },
            controller: RemoveWebsiteCtrl
        });

        RemoveWebsiteCtrl.$inject = ['$state', '$scope', 'favoritesService'];

    function RemoveWebsiteCtrl($state, $scope, favoritesService) {
        var ctrl = this;
        ctrl.favoritesService = favoritesService;

        this.$onInit = function () {

        };

        ctrl.cancel = function(){
            this.modalInstance.dismiss('cancel');
        };
        ctrl.apply = function(){
            this.favoritesService.removeWebsite(ctrl.resolve.website);
            this.modalInstance.dismiss('cancel');
        };
    }
})();
