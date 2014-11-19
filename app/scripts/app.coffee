(->

  'use strict'
  
  # {greetings,menus,actions,destinations,appellations} = jsondata

  menus = Object.keys( jsondata.menus ).map (  name )->
    menu = jsondata.menus[name]
    menu.name = name
    menu.domid = "#{name}_menu"
    menu.actions = menu.actions.map ( n )-> 
      action = jsondata.actions[n]
      action.name = n
      action.href = "#{n}_#{action.type}"
      return action
    return menu

  destinations = Object.keys(jsondata.destinations).map ( name )->
    dest = jsondata.destinations[name]
    dest.name = name
    dest.domid = "#{name}_destination"
    return dest
    
  greetings = Object.keys( jsondata.greetings ).map ( k )-> jsondata.greetings[k]
    

  renderMenu = ( menu )->
    html = ""
    html += "<nav id=\"#{menu.domid}\" class=\"menu\">"    
    if menu.name is 'main'
      html += "<header class=\"menu-title\" id=\"greeting\">Greetings</header>"
    if menu.title
      html += "<header class=\"menu-title\"><a class=\"back\" href=\"#main-menu\"><i class=\"fa fa-chevron-left\"></i></a><h1>#{menu.title}</h1></header>"
    html += "<ul class=\"actions\">"
    menu.actions.forEach ( action )->
      html += "<li class=\"action\"><a href=\"##{action.href}\">"
      html += "<img class=\"action-icon\" src=\"#{action.icon}\"/>"
      html += "<h1 class=\"action-title\">#{action.title}</h1>"
      html += "</a></li>"
    html += "</ul></nav>"
    return html

  renderDestination = ( dest )->
    "<div id=\"#{dest.domid}\" class=\"destination\">#{JSON.stringify(dest)}</div>"


  $('#content').html('')

  menus.map ( menu )->
    $('#content').append renderMenu menu 

  destinations.map ( dest )->
    $('#content').append renderDestination dest
)()