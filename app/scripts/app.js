'use strict';

/**
 * @ngdoc overview
 * @name sqrApp
 * @description
 * # sqrApp
 *
 * Main module of the application.
 */
 

 
var strings = {
   'en_CA': {
     'News is important...': 'News is important...',
     'Select an option, lay back and enjoy the mo\'!': 'Select an option, lay back and enjoy the mo\'!',
     'Only Scores': 'Only Scores',
     'All Sports': 'All Sports',
     'Hockey Hockey!': 'Hockey Hockey!',
     'Sports News-ah!': 'Sports News-ah!',
     'Burning Hot News!': 'Burning Hot News!',
     'All About The Man!': 'All About The Man!',
     'World Hapennings!': 'World Hapennings!',
     'Miley Cirus!': 'Miley Cirus!',
     'Legalize Marijuana!': 'Legalize Marijuana!',
     'Catch Up On Some News': 'Catch Up On Some News',
     'Listen To Some Music': 'Listen To Some Music',
     'Laugh Your Ass Off': 'Laugh Your Ass Off',
     'Plan Your Day': 'Plan Your Day',
     'See What Your Friends Are Up To': 'See What Your Friends Are Up To',
     'Learn Something Cool': 'Learn Something Cool',
     'Label': 'Click Here!'
   },
   'fr_CA': {
     'News is important...': 'Nouvelles Importantes',
     'Select an option, lay back and enjoy the mo\'!': 'Choisis une option.',
     'Only Scores': 'Juste Les Resultats',
     'All Sports': 'Tout les sports',
     'Hockey Hockey!': 'Hockey Hockey!',
     'Sports News-ah!': 'Nouvelles Sportives!',
     'Burning Hot News!': 'Nouvelles Chaudes!',
     'All About The Man!': 'Politische!',
     'World Hapennings!': 'Le Monde!',
     'Miley Cirus!': 'Miley Cirus!',
     'Legalize Marijuana!': 'Legalizez la Marijuana!',
     'Catch Up On Some News': 'Ratrappez les nouvelles',
     'Listen To Some Music': 'Ecoutez de la musique',
     'Laugh Your Ass Off': 'Rions encore!',
     'Plan Your Day': 'Plannifie ta journee',
     'See What Your Friends Are Up To': 'Tes amis font quoi?',
     'Learn Something Cool': 'Apprends qqc De Cool!',
     'Label': 'Clique Ici!'
   }
 };
var locale = 'en_CA';
var myApp = angular.module('myApp',[]);
myApp.factory('UserService', function() {
  return {
      name : 'anonymous'
  };
});
angular
  .module('sqrApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).filter('debug', function() {
      return function(input) {
        if (input === ''){ return 'empty string';}
        return input ? input : ('' + input);
      };
  }).factory('LocaleService', function () {
    return {
      set: function ( l ) {
        return (locale = l);
      },
      get: function ( ) {
        return locale;
      }
    };
  }).filter('translate', function ( ) {
    return function( input ){
      if( strings[locale] && strings[locale][input] ){
        return strings[locale][input];
      }else{
        return input;
      }
    };
  })
  .config(['$routeProvider', function ($routeProvider ) {
    $routeProvider
      .when('/', {
        redirectTo: '/m/main'
      })
      .when('/m/:menuName',{
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'        
      })
      .when('/v/:lang', {
        controller: 'VisitorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);