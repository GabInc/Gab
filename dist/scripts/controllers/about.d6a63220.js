'use strict';

/**
 * @ngdoc function
 * @name sqrApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sqrApp
 */
angular.module('gabApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });