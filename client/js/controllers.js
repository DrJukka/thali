'use strict';

angular.module('myApp.controllers', [])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function() {
          $scope.slide = 'slide-right';
          $window.history.back();
        }
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        }
    }])
    .controller('ContactListCtrl', ['$scope', 'Contact', '$location', function ($scope, contact, $location) {
        contact.retrieve().then(function(contacts) {
            $scope.contacts = contacts;
        }, function(reason) {
            console.log("Failed: " + reason);
        });
    }])
    .controller('ContactDetailCtrl', ['$scope', '$routeParams', 'Contact', function ($scope, $routeParams, contact) {
        contact.retrieve($routeParams.contactId).then(function(contact) {
            $scope.contact = contact;
        }, function(reason) {
            console.log("Failed: " + reason);
        });
    }])
    .controller('ContactNewCtrl', ['$scope', 'Contact', function($scope, contact) {
        $scope.contactId = '';
        $scope.contactName = '';
        $scope.onSuccess = function(data) {
            $scope.contactId = data;
            console.log(data);
        };
        $scope.onError = function(error) {
            console.log(error);
        };
        $scope.onVideoError = function(error) {
            console.log(error);
        };
        $scope.save = function(contactId, contactName) {
            console.log("Saving new contact for: " + contactId + " -> " + contactName);
            contact.create({name: contactName, uniqueId: contactId}).then(function() {
                console.log("Saved contact.");
            }, function(reason) {
                console.log("Failed to save contact: " + reason);
            });
        }
    }]);