(function() {
  var actions, destinations, greetings, menus, renderDestination, renderMenu;
  greetings = jsondata.greetings, menus = jsondata.menus, actions = jsondata.actions, destinations = jsondata.destinations;
  menus = Object.keys(menus).map(function(name) {
    var menu;
    menu = menus[name];
    menu.name = name;
    menu.domid = "" + name + "_menu";
    menu.actions = menu.actions.map(function(n) {
      var action;
      action = actions[n];
      action.name = n;
      action.href = "" + n + "_" + action.type;
      return action;
    });
    return menu;
  });
  destinations = Object.keys(destinations).map(function(name) {
    var dest;
    dest = destinations[name];
    dest.name = name;
    dest.domid = "" + name + "_destination";
    return dest;
  });
  renderMenu = function(menu) {
    var html;
    html = "";
    if (menu.name === 'main') {
      html += "<header id=\"greeting\"><h1>Greeting</h1></header>";
    }
    html += "<nav id=\"" + menu.domid + "\" class=\"menu\">";
    if (menu.title) {
      html += "<h1 class=\"menu-title\">" + menu.title + "</h1>";
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
    return "<div id=\"" + dest.domid + "\">" + (JSON.stringify(dest)) + "</div>";
  };
  $('#content').html('');
  menus.map(function(menu) {
    return $('#content').append(renderMenu(menu));
  });
  return destinations.map(function(dest) {
    return $('#content').append(renderDestination(dest));
  });
})();