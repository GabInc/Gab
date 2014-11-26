(function (exports) {
  'use strict';

  exports.gabConciergeJSONConfig = {

    'menu': {
      'main': {
        'actions': ['news', 'music', 'fun', 'plan', 'social', 'learn' ]
      },
      'news': {
        'title': 'News is important...',
        'actions': ['sports_news', 'hot_news', 'political_news', 'world_news', 'gossip_news', 'inspiring_news']
      },
      'music': {
        'title': 'News is important...',
        'actions': ['news', 'music', 'fun', 'plan', 'social', 'learn']
      },
      'fun': {
        'title': 'News is important...',
        'actions': ['news', 'music', 'fun', 'plan', 'social', 'learn']
      },
      'plan': {
        'title': 'News is important...',
        'actions': ['news', 'music', 'fun', 'plan', 'social', 'learn']
      },
      'social': {
        'title': 'News is important...',
        'actions': ['news', 'music', 'fun', 'plan', 'social', 'learn']
      },
      'learn': {
        'title': 'News is important...',
        'actions': ['news', 'music', 'fun', 'plan', 'social', 'learn']
      },
      'browse': {
        'title': 'News is important...',
        'actions': ['news', 'music', 'fun', 'plan', 'social', 'learn']
      },
      'sports_news': {
        'title': 'Select an options, lay back and enjoy the mo\'!',
        'actions': [ 'sports_news_scores', 'sports_news_all', 'sports_news_hockey', 'create_concierge' ]
      }
    },
    'link':{
      'score_board': {
        'logo': 'http://placecage.com/100/40',
        'text': 'Label',
        'href': 'http://example.com'
      },
      'rds': {
        'logo': 'http://placecage.com/100/40',
        'text': 'Label',
        'href': 'http://example.com'
      },
      'stanley': {
        'logo': 'http://placecage.com/100/40',
        'text': 'Label',
        'href': 'http://example.com'        
      }
    },
    'action': {
      'sports_news_scores': {
        'title': 'Only Scores',
        'description': 'All the Sports, one scoreboard, even cricket',
        'type': 'link',
        'links': [ 'score_board' ]
      },
      'sports_news_all': {
        'title': 'All Sports',
        'description': 'All the things sports!',
        'type': 'link',
        'links': [ 'rds' ]
      },
      'sports_news_hockey': {
        'title': 'Hockey Hockey!',
        'description': 'Where\'s that puck!?!?!',
        'type': 'link',
        'links': [ 'stanley' ]
      },
      'create_concierge': {
        'title': 'Hockey Hockey!',
        'description': 'Where\'s that puck!?!?!',
        'type': 'feature'
      },
      'sports_news':{
        'icon': 'http://placecage.com/100/100',
        'title': 'Sports News-ah!',
        'type': 'menu'        
      }, 
      'hot_news':{
        'icon': 'http://placecage.com/100/100',
        'title': 'Burning Hot News!',
        'type': 'menu'
      }, 
      'political_news':{
        'icon': 'http://placecage.com/100/100',
        'title': 'All About The Man!',
        'type': 'menu'
      }, 
      'world_news':{
        'icon': 'http://placecage.com/100/100',
        'title': 'World Hapennings!',
        'type': 'menu'
      }, 
      'gossip_news':{
        'icon': 'http://placecage.com/100/100',
        'title': 'Miley Cirus!',
        'type': 'menu'
      }, 
      'inspiring_news':{
        'icon': 'http://placecage.com/100/100',
        'title': 'Legalize Marijuana!',
        'type': 'menu'
      },
      'news': {
        'icon': 'http://placecage.com/100/100',
        'title': 'Catch Up On Some News',
        'type': 'menu'
      },
      'music': {
        'icon': 'http://placecage.com/100/100',
        'title': 'Listen To Some Music',
        'type': 'menu'
      },
      'fun': {
        'icon': 'http://placecage.com/100/100',
        'title': 'Laugh Your Ass Off',
        'type': 'menu'
      },
      'plan': {
        'icon': 'http://placecage.com/100/100',
        'title': 'Plan Your Day',
        'type': 'menu'
      },
      'social': {
        'icon': 'http://placecage.com/100/100',
        'title': 'See What Your Friends Are Up To',
        'type': 'menu'
      },
      'learn': {
        'icon': 'http://placecage.com/100/100',
        'title': 'Learn Something Cool',
        'type': 'menu'
      }
    }
  };
})(window);