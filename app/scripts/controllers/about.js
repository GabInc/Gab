'use strict';

/**
 * @ngdoc function
 * @name gabApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gabApp
 */
angular.module('gabApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
