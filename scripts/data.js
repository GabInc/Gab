/* jshint ignore:start */(function(exports){'use strict';exports.GABConcierge={ structure: {
  "menu": {
    "main": {
      "actions": ["news", "music", "fun", "plan", "social", "learn"]
    },
    "news": {
      "title": "News is important...",
      "actions": ["sports_news", "hot_news", "political_news", "world_news", "gossip_news", "inspiring_news"]
    },
    "music": {
      "title": "News is important...",
      "actions": ["news", "music", "fun", "plan", "social", "learn"]
    },
    "fun": {
      "title": "News is important...",
      "actions": ["news", "music", "fun", "plan", "social", "learn"]
    },
    "plan": {
      "title": "News is important...",
      "actions": ["news", "music", "fun", "plan", "social", "learn"]
    },
    "social": {
      "title": "News is important...",
      "actions": ["news", "music", "fun", "plan", "social", "learn"]
    },
    "learn": {
      "title": "News is important...",
      "actions": ["news", "music", "fun", "plan", "social", "learn"]
    },
    "browse": {
      "title": "News is important...",
      "actions": ["news", "music", "fun", "plan", "social", "learn"]
    },
    "sports_news": {
      "title": "Select an option, lay back and enjoy the mo'!",
      "actions": ["sports_news_scores", "sports_news_all", "sports_news_hockey", "create_concierge"]
    }
  },
  "link": {
    "score_board": {
      "logo": "http://placecage.com/100/42",
      "text": "Label",
      "href": "http://example.com"
    },
    "rds": {
      "logo": "http://placecage.com/102/40",
      "text": "Label",
      "href": "http://example.com"
    },
    "stanley": {
      "logo": "http://placecage.com/105/40",
      "text": "Label",
      "href": "http://example.com"
    }
  },
  "action": {
    "sports_news_scores": {
      "title": "Only Scores",
      "description": "All the Sports, one scoreboard, even cricket",
      "target": "link",
      "links": ["score_board", "rds", "stanley"]
    },
    "sports_news_all": {
      "title": "All Sports",
      "description": "All the things sports!",
      "target": "link",
      "links": ["rds", "score_board", "stanley"]
    },
    "sports_news_hockey": {
      "title": "Hockey Hockey!",
      "description": "Where's that puck!?!?!",
      "target": "link",
      "links": ["stanley", "rds", "score_board"]
    },
    "create_concierge": {
      "title": "Hockey Hockey!",
      "description": "Where's that puck!?!?!",
      "target": "feature"
    },
    "sports_news": {
      "icon": "http://placecage.com/100/100",
      "title": "Sports News-ah!",
      "target": "menu"
    },
    "hot_news": {
      "icon": "http://placecage.com/100/100",
      "title": "Burning Hot News!",
      "target": "menu"
    },
    "political_news": {
      "icon": "http://placecage.com/100/100",
      "title": "All About The Man!",
      "target": "menu"
    },
    "world_news": {
      "icon": "http://placecage.com/100/100",
      "title": "World Hapennings!",
      "target": "menu"
    },
    "gossip_news": {
      "icon": "http://placecage.com/100/100",
      "title": "Miley Cirus!",
      "target": "menu"
    },
    "inspiring_news": {
      "icon": "http://placecage.com/100/100",
      "title": "Legalize Marijuana!",
      "target": "menu"
    },
    "news": {
      "icon": "icon-running-news",
      "title": "Catch Up On Some News",
      "target": "menu"
    },
    "music": {
      "icon": "http://placecage.com/100/100",
      "title": "Listen To Some Music",
      "target": "menu"
    },
    "fun": {
      "icon": "http://placecage.com/100/100",
      "title": "Laugh Your Ass Off",
      "target": "menu"
    },
    "plan": {
      "icon": "http://placecage.com/100/100",
      "title": "Plan Your Day",
      "target": "menu"
    },
    "social": {
      "icon": "http://placecage.com/100/100",
      "title": "See What Your Friends Are Up To",
      "target": "menu"
    },
    "learn": {
      "icon": "http://placecage.com/100/100",
      "title": "Learn Something Cool",
      "target": "menu"
    }
  }
}
, i18n: {
  "en": {
    "News is important...": "News is important...",
    "Select an option, lay back and enjoy the mo'!": "Select an option, lay back and enjoy the mo'!",
    "Only Scores":"Only Scores",
    "All Sports":"All Sports",
    "Hockey Hockey!":"Hockey Hockey!",
    "Sports News-ah!":"Sports News-ah!",
    "Burning Hot News!":"Burning Hot News!",
    "All About The Man!":"All About The Man!",
    "World Hapennings!":"World Hapennings!",
    "Miley Cirus!":"Miley Cirus!",
    "Legalize Marijuana!":"Legalize Marijuana!",
    "Catch Up On Some News":"Catch Up On Some News",
    "Listen To Some Music":"Listen To Some Music",
    "Laugh Your Ass Off":"Laugh Your Ass Off",
    "Plan Your Day":"Plan Your Day",
    "See What Your Friends Are Up To":"See What Your Friends Are Up To",
    "Learn Something Cool":"Learn Something Cool",
    "Label": "Click Here!"
  },
  "fr":{
    "News is important...": "Nouvelles Importantes",
    "Select an option, lay back and enjoy the mo'!": "Choisis une option.",
    "Only Scores":"Juste Les Resultats",
    "All Sports":"Tout les sports",
    "Hockey Hockey!":"Hockey Hockey!",
    "Sports News-ah!":"Nouvelles Sportives!",
    "Burning Hot News!":"Nouvelles Chaudes!",
    "All About The Man!":"Politische!",
    "World Hapennings!":"Le Monde!",
    "Miley Cirus!":"Miley Cirus!",
    "Legalize Marijuana!":"Legalizez la Marijuana!",
    "Catch Up On Some News":"Ratrappez les nouvelles",
    "Listen To Some Music":"Ecoutez de la musique",
    "Laugh Your Ass Off":"Rions encore!",
    "Plan Your Day":"Plannifie ta journee",
    "See What Your Friends Are Up To":"Tes amis font quoi?",
    "Learn Something Cool":"Apprends qqc De Cool!",
    "Label": "Clique Ici!"   
  }
} };})(this);/* jshint ignore:end */