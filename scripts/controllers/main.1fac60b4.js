'use strict';

/**
 * @ngdoc function
 * @name sqrApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sqrApp
 */
angular.module('gabApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
