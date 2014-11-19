(function() {
  'use strict';
  var destinations, greetings, menus, renderDestination, renderMenu;
  menus = Object.keys(jsondata.menus).map(function(name) {
    var menu;
    menu = jsondata.menus[name];
    menu.name = name;
    menu.domid = "" + name + "_menu";
    menu.actions = menu.actions.map(function(n) {
      var action;
      action = jsondata.actions[n];
      action.name = n;
      action.href = "" + n + "_" + action.type;
      return action;
    });
    return menu;
  });
  destinations = Object.keys(jsondata.destinations).map(function(name) {
    var dest;
    dest = jsondata.destinations[name];
    dest.name = name;
    dest.domid = "" + name + "_destination";
    return dest;
  });
  greetings = Object.keys(jsondata.greetings).map(function(k) {
    return jsondata.greetings[k];
  });
  renderMenu = function(menu) {
    var html;
    html = "";
    html += "<nav id=\"" + menu.domid + "\" class=\"menu\">";
    if (menu.name === 'main') {
      html += "<header class=\"menu-title\" id=\"greeting\">Greetings</header>";
    }
    if (menu.title) {
      html += "<header class=\"menu-title\"><a class=\"back\" href=\"#main-menu\"><i class=\"fa fa-chevron-left\"></i></a><h1>" + menu.title + "</h1></header>";
    }
    html += "<ul class=\"actions\">";
    menu.actions.forEach(function(action) {
      html += "<li class=\"action\"><a href=\"#" + action.href + "\">";
      html += "<img class=\"action-icon\" src=\"" + action.icon + "\"/>";
      html += "<h1 class=\"action-title\">" + action.title + "</h1>";
      return html += "</a></li>";
    });
    html += "</ul></nav>";
    return html;
  };
  renderDestination = function(dest) {
    return "<div id=\"" + dest.domid + "\" class=\"destination\">" + (JSON.stringify(dest)) + "</div>";
  };
  $('#content').html('');
  menus.map(function(menu) {
    return $('#content').append(renderMenu(menu));
  });
  return destinations.map(function(dest) {
    return $('#content').append(renderDestination(dest));
  });
})();
