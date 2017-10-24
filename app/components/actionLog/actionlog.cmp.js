(function () {
    'use strict';

    angular.module('app.layout')
        .component('actionlog', {
            templateUrl: 'components/actionlog/actionlog.html',
            bindings: {

            },
            controller: ActionLogsCtrl
        });

        ActionLogsCtrl.$inject = ['favoritesService', '$state', '$scope'];

    function ActionLogsCtrl(favoritesService,  $state, $scope) {
        var ctrl = this;
        ctrl.favoritesService = favoritesService;

        this.$onInit = function () {
            ctrl.setProduct = function(productId){
                $state.transitionTo('root.home.product', {id: productId});
            };
            ctrl.addProduct = function(){
                $state.transitionTo('root.home.product', {id: -1});
            };
            ctrl.deleteProduct = function(productId){
                ctrl.productService.deleteProduct(productId);
            };

            ctrl.loadData();
        };

        ctrl.loadData = function(){
            favoritesService.getActionLogs().then(function(logs){
                ctrl.logs = logs;
            })
        }
    }
})();
