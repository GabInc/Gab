'use strict';

/**
 * @ngdoc function
 * @name gabApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gabApp
 */
angular.module('gabApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
