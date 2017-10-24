/* global angular */
(function () {
    'use strict';

    angular.module('app.services').service('favoritesService',
        ['$rootScope', 'localStorageService', '$q', 'ACTION_LOGS',
            function ($rootScope, localStorageService, $q, ACTION_LOGS) {

                var FavoritesPref = function () {

                };
                FavoritesPref.prototype = {
                    save: function () {
                        localStorageService.set('sites', this._sites);
                        localStorageService.set('logs', this._logs);
                    },
                    load: function () {
                        var deferred = $q.defer();
                        var that = this;
                        if (localStorageService.get('sites')) {
                            that._sites = localStorageService.get('sites');
                            that._logs = localStorageService.get('logs') || [];
                            deferred.resolve(that);
                        }
                        else {
                            that._sites = store.Sites.sites; // like from db
                            that._logs = localStorageService.get('logs') || [];
                            localStorageService.set('sites', that._sites);
                            deferred.resolve(that);
                        }
                        return deferred.promise;
                    }
                };

                var _favoritesPref = new FavoritesPref();

                var getActionlogs = function () {
                    var deferred = $q.defer();

                    _favoritesPref.load().then(function (pref) {
                        deferred.resolve(pref._logs);
                    }, function (status) {
                        deferred.reject(status);
                    });

                    return deferred.promise;
                };

                var getWebsites = function () {
                    var deferred = $q.defer();

                    _favoritesPref.load().then(function (pref) {
                        deferred.resolve(pref._sites);
                    }, function (status) {
                        deferred.reject(status);
                    });

                    return deferred.promise;
                };

                var addWebsiteOrUpdate = function(website){
                    var deferred = $q.defer();

                    var action;
                    if (website.id){ // only existing records have id
                        var selectedWebsite = _.filter(_favoritesPref._sites, {id: website.id})[0];
                        if (selectedWebsite){
                            selectedWebsite.name = website.name;
                            selectedWebsite.url = website.url;
                        }
                        action= ACTION_LOGS.WEBSITE_EDIT;
                    }
                    else{
                        // new website
                        var website_id = 1;
                        if (_favoritesPref._sites){
                            var max_id =_favoritesPref._sites.reduce(function(a, b)
                            {
                                return a['id'] > b['id'] ? a.id : b.id
                            }
                            );
                            website.id = max_id + 1;
                        }
                        else{
                            _favoritesPref._sites = [];
                            website.id = 1;
                        }
                        action= ACTION_LOGS.WEBSITE_ADD;
                        _favoritesPref._sites.push(website);
                    }

                    _favoritesPref._logs.push({
                        datetime: Date(),
                        action: action,
                        websiteName: website.name,
                        Url: website.url
                    });

                    // now save back to preferences
                    _favoritesPref.save();

                    deferred.resolve(_favoritesPref._sites);
                    return deferred.promise;
                };

                var removeWebsite = function(website){
                    var deferred = $q.defer();
                    var selectedWebsite = _.filter(_favoritesPref._sites, {id: website.id})[0];
                    _favoritesPref._sites.pop(selectedWebsite);
                    if (_favoritesPref._sites.length === 0){
                        _favoritesPref._sites = null;
                    }
                    _favoritesPref._logs.push({
                        datetime: Date(),
                        action: ACTION_LOGS.WEBSITE_REMOVE,
                        websiteName: website.name,
                        Url: website.url
                    });
                    _favoritesPref.save();
                    deferred.resolve(_favoritesPref._sites);
                    return deferred.promise;
                };

                return {
                    getWebsites: getWebsites,
                    getActionLogs: getActionlogs,
                    //getProductById: getProductById,
                    addWebsiteOrUpdate: addWebsiteOrUpdate,
                    removeWebsite: removeWebsite
                }
            }]);
})();
