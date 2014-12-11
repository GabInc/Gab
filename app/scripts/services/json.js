'use strict';

/**
 * @ngdoc service
 * @name sqrApp.json
 * @description
 * # json
 * Provider in the sqrApp.
 */
angular.module('sqrApp')
  .provider('json', function () {
    var menuJSON = [{
      'name': 'main',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Catch Up On Some News',
        'target': 'menu',
        'name': 'news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Listen To Some Music',
        'target': 'menu',
        'name': 'music'
      }, {
        'icon': 'concierge-icon-arcade',
        'title': 'Laugh Your Ass Off',
        'target': 'menu',
        'name': 'fun'
      }, {
        'icon': 'concierge-icon-organizer',
        'title': 'Plan Your Day',
        'target': 'menu',
        'name': 'plan'
      }, {
        'icon': 'concierge-icon-social-people',
        'title': 'See What Your Friends Are Up To',
        'target': 'menu',
        'name': 'social'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Learn Something Cool',
        'target': 'menu',
        'name': 'learn'
      }],
      'isMainMenu': true,
      'hasActions': true
    }, {
      'name': 'news',
      'title': 'News is important...',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Sports News-ah!',
        'target': 'menu',
        'name': 'sports_news'
      }, {
        'icon': 'concierge-icon-running-news',
        'title': 'Burning Hot News!',
        'target': 'menu',
        'name': 'hot_news'
      }, {
        'icon': 'concierge-icon-running-news',
        'title': 'All About The Man!',
        'target': 'menu',
        'name': 'political_news'
      }, {
        'icon': 'concierge-icon-screen-book',
        'title': 'World Hapennings!',
        'target': 'menu',
        'name': 'world_news'
      }, {
        'icon': 'concierge-icon-angel-face',
        'title': 'Miley Cirus!',
        'target': 'menu',
        'name': 'gossip_news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Legalize Marijuana!',
        'target': 'menu',
        'name': 'inspiring_news'
      }],
      'hasActions': true
    }, {
      'name': 'music',
      'title': 'News is important...',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Catch Up On Some News',
        'target': 'menu',
        'name': 'news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Listen To Some Music',
        'target': 'menu',
        'name': 'music'
      }, {
        'icon': 'concierge-icon-arcade',
        'title': 'Laugh Your Ass Off',
        'target': 'menu',
        'name': 'fun'
      }, {
        'icon': 'concierge-icon-organizer',
        'title': 'Plan Your Day',
        'target': 'menu',
        'name': 'plan'
      }, {
        'icon': 'concierge-icon-social-people',
        'title': 'See What Your Friends Are Up To',
        'target': 'menu',
        'name': 'social'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Learn Something Cool',
        'target': 'menu',
        'name': 'learn'
      }],
      'hasActions': true
    }, {
      'name': 'fun',
      'title': 'News is important...',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Catch Up On Some News',
        'target': 'menu',
        'name': 'news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Listen To Some Music',
        'target': 'menu',
        'name': 'music'
      }, {
        'icon': 'concierge-icon-arcade',
        'title': 'Laugh Your Ass Off',
        'target': 'menu',
        'name': 'fun'
      }, {
        'icon': 'concierge-icon-organizer',
        'title': 'Plan Your Day',
        'target': 'menu',
        'name': 'plan'
      }, {
        'icon': 'concierge-icon-social-people',
        'title': 'See What Your Friends Are Up To',
        'target': 'menu',
        'name': 'social'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Learn Something Cool',
        'target': 'menu',
        'name': 'learn'
      }],
      'hasActions': true
    }, {
      'name': 'plan',
      'title': 'News is important...',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Catch Up On Some News',
        'target': 'menu',
        'name': 'news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Listen To Some Music',
        'target': 'menu',
        'name': 'music'
      }, {
        'icon': 'concierge-icon-arcade',
        'title': 'Laugh Your Ass Off',
        'target': 'menu',
        'name': 'fun'
      }, {
        'icon': 'concierge-icon-organizer',
        'title': 'Plan Your Day',
        'target': 'menu',
        'name': 'plan'
      }, {
        'icon': 'concierge-icon-social-people',
        'title': 'See What Your Friends Are Up To',
        'target': 'menu',
        'name': 'social'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Learn Something Cool',
        'target': 'menu',
        'name': 'learn'
      }],
      'hasActions': true
    }, {
      'name': 'social',
      'title': 'News is important...',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Catch Up On Some News',
        'target': 'menu',
        'name': 'news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Listen To Some Music',
        'target': 'menu',
        'name': 'music'
      }, {
        'icon': 'concierge-icon-arcade',
        'title': 'Laugh Your Ass Off',
        'target': 'menu',
        'name': 'fun'
      }, {
        'icon': 'concierge-icon-organizer',
        'title': 'Plan Your Day',
        'target': 'menu',
        'name': 'plan'
      }, {
        'icon': 'concierge-icon-social-people',
        'title': 'See What Your Friends Are Up To',
        'target': 'menu',
        'name': 'social'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Learn Something Cool',
        'target': 'menu',
        'name': 'learn'
      }],
      'hasActions': true
    }, {
      'name': 'learn',
      'title': 'News is important...',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Catch Up On Some News',
        'target': 'menu',
        'name': 'news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Listen To Some Music',
        'target': 'menu',
        'name': 'music'
      }, {
        'icon': 'concierge-icon-arcade',
        'title': 'Laugh Your Ass Off',
        'target': 'menu',
        'name': 'fun'
      }, {
        'icon': 'concierge-icon-organizer',
        'title': 'Plan Your Day',
        'target': 'menu',
        'name': 'plan'
      }, {
        'icon': 'concierge-icon-social-people',
        'title': 'See What Your Friends Are Up To',
        'target': 'menu',
        'name': 'social'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Learn Something Cool',
        'target': 'menu',
        'name': 'learn'
      }],

      'hasActions': true
    }, {
      'name': 'browse',
      'title': 'News is important...',
      'actions': [{
        'icon': 'concierge-icon-running-news',
        'title': 'Catch Up On Some News',
        'target': 'menu',
        'name': 'news'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Listen To Some Music',
        'target': 'menu',
        'name': 'music'
      }, {
        'icon': 'concierge-icon-arcade',
        'title': 'Laugh Your Ass Off',
        'target': 'menu',
        'name': 'fun'
      }, {
        'icon': 'concierge-icon-organizer',
        'title': 'Plan Your Day',
        'target': 'menu',
        'name': 'plan'
      }, {
        'icon': 'concierge-icon-social-people',
        'title': 'See What Your Friends Are Up To',
        'target': 'menu',
        'name': 'social'
      }, {
        'icon': 'concierge-icon-broken-glasses',
        'title': 'Learn Something Cool',
        'target': 'menu',
        'name': 'learn'
      }],

      'hasActions': true
    }, {
      'name': 'sports_news',
      'title': 'Select an option, lay back and enjoy the mo\'!',
      'actions': [{
        'title': 'Only Scores',
        'description': 'All the Sports, one scoreboard, even cricket',
        'target': 'link',
        'links': [{
          'logo': 'http://placecage.com/100/42',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'score_board'
        }, {
          'logo': 'http://placecage.com/102/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'rds'
        }, {
          'logo': 'http://placecage.com/105/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'stanley'
        }],
        'hasLinks': true
      }, {
        'title': 'All Sports',
        'description': 'All the things sports!',
        'target': 'link',
        'links': [{
          'logo': 'http://placecage.com/102/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'rds'
        }, {
          'logo': 'http://placecage.com/100/42',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'score_board'
        }, {
          'logo': 'http://placecage.com/105/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'stanley'
        }],
        'hasLinks': true
      }, {
        'title': 'Hockey Hockey!',
        'description': 'Where\'s that puck!?!?!',
        'target': 'link',
        'links': [{
          'logo': 'http://placecage.com/105/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'stanley'
        }, {
          'logo': 'http://placecage.com/102/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'rds'
        }, {
          'logo': 'http://placecage.com/100/42',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'score_board'
        }],
        'hasLinks': true
      }, {
        'title': 'Hockey Hockey!',
        'description': 'Where\'s that puck!?!?!',
        'target': 'link',
        'name': 'create_concierge',
        'links': [{
          'logo': 'http://placecage.com/105/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'stanley'
        }, {
          'logo': 'http://placecage.com/102/40',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'rds'
        }, {
          'logo': 'http://placecage.com/100/42',
          'text': 'Label',
          'href': 'http://example.com',
          'name': 'score_board'
        }],
        'hasLinks': true
      }],
      'hasActions': true
    }];
    var Menu = function () {
      this.getMenu = function( name ) {
        return menuJSON.reduce(function(a, b) {
          return b.name === name ? b : a;
        });
      };
      return this;
    };
  
    // // Method for instantiating
    this.$get = function () {
      return new Menu();
    };
  });
