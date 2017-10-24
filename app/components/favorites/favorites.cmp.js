(function () {
    'use strict';

    angular.module('app.layout')
        .component('favorites', {
            templateUrl: 'components/favorites/favorites.html',
            bindings: {

            },
            controller: FavoritesCtrl
        })

    FavoritesCtrl.$inject = ['$uibModal', 'favoritesService', '$state', '$scope'];

    function FavoritesCtrl($uibModal, favoritesService, $state, $scope) {
        var ctrl = this;
        
        ctrl.favoritesService = favoritesService;

        $scope.$on('ev-sites-changed',  function(ev, data){
            ctrl.loadData();
        });

        ctrl.$onInit = function () {
            ctrl.addWebsite = function(){
                $uibModal.open({
                    component: 'addeditsite',
                    windowClass: 'modal-dashboard',
                    resolve: {
                        title: function(){
                            return "Add Website";
                        }
                    }
                })
            };

            ctrl.editWebsite = function(website){
                $uibModal.open({
                    component: 'addeditsite',
                    windowClass: 'modal-dashboard',
                    resolve: {
                        title: function(){
                            return "Edit Website";
                        },
                        website: function(){
                            return website;
                        }
                    }
                })
            };
            
            ctrl.deleteWebsite = function(website){
                $uibModal.open({
                    component: 'removewebsite',
                    windowClass: 'modal-dashboard',
                    resolve: {
                        website: function(){
                            return website;
                        }
                    }
                })
            };

            ctrl.loadData();
        };

        ctrl.loadData = function(){
            favoritesService.getWebsites().then(function(websites){
                ctrl.websites = websites;
            })
        }
    }
})();
