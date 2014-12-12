'use strict';

/**
 * @ngdoc function
 * @name sqrApp.controller:VisitorCtrl
 * @description
 * # VisitorCtrl
 * Controller of the sqrApp
 */
angular.module('gabApp')
  .controller('VisitorCtrl', function ($scope, LocaleService ) {
    $scope.placeholder = 'Sunshine';
    $scope.locale = LocaleService.get();
    $scope.setLocale = LocaleService.set;
    $scope.getLocale = LocaleService.get;
  });
