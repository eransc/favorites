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
        $scope.objects = [
            {id:1, name : 'Dilip', type :{ title : 'a'}},
            {id:2, name : 'Devendra', type :{ title : 'b'}},
            {id:3, name : 'Jayesh', type :{ title : 'a'}},
            {id:4, name : 'Jekin', type :{ title : 'c'}},
            {id:5, name : 'Gaurang', type :{ title : 'a'}},
            {id:6, name : 'Bhavin', type :{ title : 'e'}},
    
        ];
        
        ctrl.favoritesService = favoritesService;

        $scope.$on('ev-sites-changed',  function(ev, data){
            ctrl.loadData();
        });

        this.$onInit = function () {
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
