'use strict';

/**
 * @ngdoc function
 * @name sqrApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the sqrApp
 */



angular.module('gabApp').controller('MenuCtrl', ['$scope', '$routeParams', '$location', 'json', function($scope, $routeParams, $location, jsonProvider ) {

  
  $scope.menu = jsonProvider.getMenu( ($routeParams.menuName || 'main') );
  
  $scope.toPath = function(path) {
    $location.path(path);
  };

  $scope.goBack = function() {
    if ($scope.previous && $scope.previous.name !== $scope.menu.name) {
      $scope.menu = $scope.previous;
    } else {
      $scope.menu = jsonProvider.getMenu('main');
    }

  };

  $scope.toMenu = function(action) {
    $scope.previous = $scope.menu;
    if (action && action.target === 'menu') {
      $scope.menu = jsonProvider.getMenu(action.name);
    }
  };

  $scope.toMenu({
    target: 'menu',
    name: 'main'
  });


}]);
