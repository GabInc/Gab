window.grunticon=function(a){if(a&&3===a.length){var b=window,c=!(!b.document.createElementNS||!b.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||window.opera&&-1===navigator.userAgent.indexOf("Chrome")||-1!==navigator.userAgent.indexOf("Series40")),d=function(d){var e=b.document.createElement("link"),f=b.document.getElementsByTagName("script")[0];e.rel="stylesheet",e.href=a[d&&c?0:d?1:2],e.media="only x",f.parentNode.insertBefore(e,f),setTimeout(function(){e.media="all"})},e=new b.Image;e.onerror=function(){d(!1)},e.onload=function(){d(1===e.width&&1===e.height)},e.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}},grunticon(["styles/concierge-icons-data-svg.css","styles/concierge-icons-data-png.css","styles/concierge-icons-fallback.css"]);var strings={en_CA:{"News is important...":"News is important...","Select an option, lay back and enjoy the mo'!":"Select an option, lay back and enjoy the mo'!","Only Scores":"Only Scores","All Sports":"All Sports","Hockey Hockey!":"Hockey Hockey!","Sports News-ah!":"Sports News-ah!","Burning Hot News!":"Burning Hot News!","All About The Man!":"All About The Man!","World Hapennings!":"World Hapennings!","Miley Cirus!":"Miley Cirus!","Legalize Marijuana!":"Legalize Marijuana!","Catch Up On Some News":"Catch Up On Some News","Listen To Some Music":"Listen To Some Music","Laugh Your Ass Off":"Laugh Your Ass Off","Plan Your Day":"Plan Your Day","See What Your Friends Are Up To":"See What Your Friends Are Up To","Learn Something Cool":"Learn Something Cool",Label:"Click Here!"},fr_CA:{"News is important...":"Nouvelles Importantes","Select an option, lay back and enjoy the mo'!":"Choisis une option.","Only Scores":"Juste Les Resultats","All Sports":"Tout les sports","Hockey Hockey!":"Hockey Hockey!","Sports News-ah!":"Nouvelles Sportives!","Burning Hot News!":"Nouvelles Chaudes!","All About The Man!":"Politische!","World Hapennings!":"Le Monde!","Miley Cirus!":"Miley Cirus!","Legalize Marijuana!":"Legalizez la Marijuana!","Catch Up On Some News":"Ratrappez les nouvelles","Listen To Some Music":"Ecoutez de la musique","Laugh Your Ass Off":"Rions encore!","Plan Your Day":"Plannifie ta journee","See What Your Friends Are Up To":"Tes amis font quoi?","Learn Something Cool":"Apprends qqc De Cool!",Label:"Clique Ici!"}},locale="en_CA";angular.module("gabApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).filter("debug",function(){return function(a){return""===a?"empty string":a?a:""+a}}).factory("LocaleService",function(){return{set:function(a){return locale=a},get:function(){return locale}}}).filter("translate",function(){return function(a){return strings[locale]&&strings[locale][a]?strings[locale][a]:a}}).config(["$routeProvider",function(a){a.when("/",{redirectTo:"/m/main"}).when("/m/:menuName",{templateUrl:"views/menu.html",controller:"MenuCtrl"}).when("/v/:lang",{controller:"VisitorCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("gabApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("gabApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("gabApp").controller("MenuCtrl",["$scope","$routeParams","$location","json",function(a,b,c,d){a.menu=d.getMenu(b.menuName||"main"),a.toPath=function(a){c.path(a)},a.goBack=function(){a.menu=a.previous&&a.previous.name!==a.menu.name?a.previous:d.getMenu("main")},a.toMenu=function(b){a.previous=a.menu,b&&"menu"===b.target&&(a.menu=d.getMenu(b.name))},a.toMenu({target:"menu",name:"main"})}]),angular.module("gabApp").controller("VisitorCtrl",["$scope","LocaleService",function(a,b){a.placeholder="Sunshine",a.locale=b.get(),a.setLocale=b.set,a.getLocale=b.get}]),angular.module("gabApp").provider("json",function(){var a=[{name:"main",actions:[{icon:"concierge-icon-running-news",title:"Catch Up On Some News",target:"menu",name:"news"},{icon:"concierge-icon-broken-glasses",title:"Listen To Some Music",target:"menu",name:"music"},{icon:"concierge-icon-arcade",title:"Laugh Your Ass Off",target:"menu",name:"fun"},{icon:"concierge-icon-organizer",title:"Plan Your Day",target:"menu",name:"plan"},{icon:"concierge-icon-social-people",title:"See What Your Friends Are Up To",target:"menu",name:"social"},{icon:"concierge-icon-broken-glasses",title:"Learn Something Cool",target:"menu",name:"learn"}],isMainMenu:!0,hasActions:!0},{name:"news",title:"News is important...",actions:[{icon:"concierge-icon-running-news",title:"Sports News-ah!",target:"menu",name:"sports_news"},{icon:"concierge-icon-running-news",title:"Burning Hot News!",target:"menu",name:"hot_news"},{icon:"concierge-icon-running-news",title:"All About The Man!",target:"menu",name:"political_news"},{icon:"concierge-icon-screen-book",title:"World Hapennings!",target:"menu",name:"world_news"},{icon:"concierge-icon-angel-face",title:"Miley Cirus!",target:"menu",name:"gossip_news"},{icon:"concierge-icon-broken-glasses",title:"Legalize Marijuana!",target:"menu",name:"inspiring_news"}],hasActions:!0},{name:"music",title:"News is important...",actions:[{icon:"concierge-icon-running-news",title:"Catch Up On Some News",target:"menu",name:"news"},{icon:"concierge-icon-broken-glasses",title:"Listen To Some Music",target:"menu",name:"music"},{icon:"concierge-icon-arcade",title:"Laugh Your Ass Off",target:"menu",name:"fun"},{icon:"concierge-icon-organizer",title:"Plan Your Day",target:"menu",name:"plan"},{icon:"concierge-icon-social-people",title:"See What Your Friends Are Up To",target:"menu",name:"social"},{icon:"concierge-icon-broken-glasses",title:"Learn Something Cool",target:"menu",name:"learn"}],hasActions:!0},{name:"fun",title:"News is important...",actions:[{icon:"concierge-icon-running-news",title:"Catch Up On Some News",target:"menu",name:"news"},{icon:"concierge-icon-broken-glasses",title:"Listen To Some Music",target:"menu",name:"music"},{icon:"concierge-icon-arcade",title:"Laugh Your Ass Off",target:"menu",name:"fun"},{icon:"concierge-icon-organizer",title:"Plan Your Day",target:"menu",name:"plan"},{icon:"concierge-icon-social-people",title:"See What Your Friends Are Up To",target:"menu",name:"social"},{icon:"concierge-icon-broken-glasses",title:"Learn Something Cool",target:"menu",name:"learn"}],hasActions:!0},{name:"plan",title:"News is important...",actions:[{icon:"concierge-icon-running-news",title:"Catch Up On Some News",target:"menu",name:"news"},{icon:"concierge-icon-broken-glasses",title:"Listen To Some Music",target:"menu",name:"music"},{icon:"concierge-icon-arcade",title:"Laugh Your Ass Off",target:"menu",name:"fun"},{icon:"concierge-icon-organizer",title:"Plan Your Day",target:"menu",name:"plan"},{icon:"concierge-icon-social-people",title:"See What Your Friends Are Up To",target:"menu",name:"social"},{icon:"concierge-icon-broken-glasses",title:"Learn Something Cool",target:"menu",name:"learn"}],hasActions:!0},{name:"social",title:"News is important...",actions:[{icon:"concierge-icon-running-news",title:"Catch Up On Some News",target:"menu",name:"news"},{icon:"concierge-icon-broken-glasses",title:"Listen To Some Music",target:"menu",name:"music"},{icon:"concierge-icon-arcade",title:"Laugh Your Ass Off",target:"menu",name:"fun"},{icon:"concierge-icon-organizer",title:"Plan Your Day",target:"menu",name:"plan"},{icon:"concierge-icon-social-people",title:"See What Your Friends Are Up To",target:"menu",name:"social"},{icon:"concierge-icon-broken-glasses",title:"Learn Something Cool",target:"menu",name:"learn"}],hasActions:!0},{name:"learn",title:"News is important...",actions:[{icon:"concierge-icon-running-news",title:"Catch Up On Some News",target:"menu",name:"news"},{icon:"concierge-icon-broken-glasses",title:"Listen To Some Music",target:"menu",name:"music"},{icon:"concierge-icon-arcade",title:"Laugh Your Ass Off",target:"menu",name:"fun"},{icon:"concierge-icon-organizer",title:"Plan Your Day",target:"menu",name:"plan"},{icon:"concierge-icon-social-people",title:"See What Your Friends Are Up To",target:"menu",name:"social"},{icon:"concierge-icon-broken-glasses",title:"Learn Something Cool",target:"menu",name:"learn"}],hasActions:!0},{name:"browse",title:"News is important...",actions:[{icon:"concierge-icon-running-news",title:"Catch Up On Some News",target:"menu",name:"news"},{icon:"concierge-icon-broken-glasses",title:"Listen To Some Music",target:"menu",name:"music"},{icon:"concierge-icon-arcade",title:"Laugh Your Ass Off",target:"menu",name:"fun"},{icon:"concierge-icon-organizer",title:"Plan Your Day",target:"menu",name:"plan"},{icon:"concierge-icon-social-people",title:"See What Your Friends Are Up To",target:"menu",name:"social"},{icon:"concierge-icon-broken-glasses",title:"Learn Something Cool",target:"menu",name:"learn"}],hasActions:!0},{name:"sports_news",title:"Select an option, lay back and enjoy the mo'!",actions:[{title:"Only Scores",description:"All the Sports, one scoreboard, even cricket",target:"link",links:[{logo:"http://placecage.com/100/42",text:"Label",href:"http://example.com",name:"score_board"},{logo:"http://placecage.com/102/40",text:"Label",href:"http://example.com",name:"rds"},{logo:"http://placecage.com/105/40",text:"Label",href:"http://example.com",name:"stanley"}],hasLinks:!0},{title:"All Sports",description:"All the things sports!",target:"link",links:[{logo:"http://placecage.com/102/40",text:"Label",href:"http://example.com",name:"rds"},{logo:"http://placecage.com/100/42",text:"Label",href:"http://example.com",name:"score_board"},{logo:"http://placecage.com/105/40",text:"Label",href:"http://example.com",name:"stanley"}],hasLinks:!0},{title:"Hockey Hockey!",description:"Where's that puck!?!?!",target:"link",links:[{logo:"http://placecage.com/105/40",text:"Label",href:"http://example.com",name:"stanley"},{logo:"http://placecage.com/102/40",text:"Label",href:"http://example.com",name:"rds"},{logo:"http://placecage.com/100/42",text:"Label",href:"http://example.com",name:"score_board"}],hasLinks:!0},{title:"Hockey Hockey!",description:"Where's that puck!?!?!",target:"link",name:"create_concierge",links:[{logo:"http://placecage.com/105/40",text:"Label",href:"http://example.com",name:"stanley"},{logo:"http://placecage.com/102/40",text:"Label",href:"http://example.com",name:"rds"},{logo:"http://placecage.com/100/42",text:"Label",href:"http://example.com",name:"score_board"}],hasLinks:!0}],hasActions:!0}],b=function(){return this.getMenu=function(b){return a.reduce(function(a,c){return c.name===b?c:a})},this};this.$get=function(){return new b}});