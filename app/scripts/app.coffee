

'use strict'

### jshint ignore:start ###

Handlebars.registerHelper "render_actions", ( obj, fn )->
  out = obj.map ( name )-> 
    rendered = Concierge.render Concierge.action[name]
    rendered.get(0).outerHTML
  new Handlebars.SafeString out.join('')

Handlebars.registerHelper "render_links", ( obj, fn )->
  out = obj.map ( name )-> 
    rendered = Concierge.render Concierge.link[name]
    rendered.get(0).outerHTML
  new Handlebars.SafeString out.join('')
  
location = window.history.location || window.location


###
  Base class for DRYer Code
###
class Concierge
  @decorate: ( object, properties )->
    object[key] = val for key, val of properties
    return object
    
  ### Store JSON locally to the class ###
  @json:  window.gabConciergeJSONConfig
  
  @resetMenus: ( callback )->
    Concierge.container.find( '.menu.active' ).removeClass( 'active' )
    setTimeout callback, 200
    
  @activateMenu: (  href )->
    if Concierge.busy then return false
    Concierge.busy = true
    name = href.replace /#|_menu/g, ''
    Concierge.resetMenus ->
      Concierge.menu[name].show ->
        Concierge.busy = false
        historyMethod = 'replaceState'
        if history.state and history.state.target and history.state.target isnt href      
          historyMethod = 'pushState'
        history[historyMethod] { target: href }, name, "#{href}"
    return @
    
  @init: ( container )->
    Concierge.container = $( container ).empty()
    
    ### Read JSON data and build proper Class Instances ###
    Object.keys( Concierge.json ).forEach ( klass )->
      Concierge[klass] = {}
      Object.keys( Concierge.json[klass] ).reduce ( mapping, name )->
        mapping[name] = Concierge.factory klass, name
        mapping[name].init()
        return mapping
      , Concierge[klass]
      
    Object.keys( Concierge.menu ).forEach ( name )->
      render = Concierge.render Concierge.menu[name]
      Concierge.container.append render
    
    Concierge.container.on 'click', '.menu-action .inner, .menu .back', ( event )->
      event.preventDefault()
      Concierge.activateMenu $( this ).attr 'href'
    
    # Concierge.container.on 'click', , ( event )->
    #   event.preventDefault()
    #   history.go( -1 )
      
    return Concierge
    
  # @factory: menu: Menu, action: Action, link: Link
  @factory: ( klass, name )->
    Klass = klass[0].toUpperCase() + klass.slice(1)
    new Concierge[Klass] name
    
  @render: ( instance )->
    {classname} = instance
    templateSource = $("##{classname}_template").html()
    render = Handlebars.compile templateSource
    $el = $ render instance.json
    $el.data classname, instance
    instance.$el = $el
    return $el
        
  ###
    Inheritable Constructor for DRYness
  ###
  constructor: ( @name )->
     @classname  = @constructor.name.toLowerCase()
     @json       = Concierge.json[ @classname ][ @name ]
     Concierge.decorate @json, 
       name: @name
       classname: @classname
       domid: "#{@classname}_#{@name}"
     
     return @    
  
class Concierge.Action extends Concierge
  init: (  )->
    Concierge.decorate @json, href: "#{@name}_#{@json.type}"
    return @
    
class Concierge.Link extends Concierge
  init: (  )->
    Concierge.decorate @json, href: "#{@name}_link"
    return @
    
class Concierge.Menu extends Concierge
  init: ( )->
    @isMain = @name is 'main'
    Concierge.decorate @json, href: "#{@name}_#{@json.type}"
    return @
    
  ###
    Toggles visible states of menus
  ###
  show: ( callback )->
    @$el.addClass 'active'
    setTimeout callback, 200

  ###
    Remove "active" class from main element
  ###
  hide: ( )->
    @$el.removeClass 'active'
    setTimeout callback, 200
  
class Concierge.Visitor
  constructor: -> true

$ -> 
  Concierge.init '#content'
  Concierge.activateMenu '#main_menu'
  $(window).on 'popstate', ( event )->
    state = event.originalEvent.state
    if state then Concierge.activateMenu state.target

### jshint ignore:end ###