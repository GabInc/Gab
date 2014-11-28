
'use strict'

### jshint ignore:start ###

## Necessary for History polyfill.
location = window.history.location || window.location

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
  


  

###
  Base class for DRYer Code
###
class Concierge
  @decorate: ( object, properties )->
    object[key] = val for key, val of properties
    return object
    
  ### Store JSON locally to the class ###
  @getJSON: ( lang  )->
    lang ?= @getLang( )
    translate_keys = ['title','description','text']
    stringified = JSON.stringify GABJSON.concierge 
    i18n GABJSON.i18n[lang]
    JSON.parse stringified, ( k, v )->
      if k in translate_keys then return i18n._ v
      return v
      
  @getLang: ()->
    @visitor.get('lang') || ( navigator.userLanguage||navigator.language||navigator.browserLanguage||navigator.systemLanguage).replace(/-.+/,'')
    
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
    
  @init: ( container, callback )->
    Concierge.visitor   = new Concierge.Visitor()
    Concierge.container = $( container ).empty()
    Concierge.json      = Concierge.getJSON()
    vstats = Concierge.visitor.all()
    Concierge.json.menu.main.actions.sort ( a, b )->
      a = vstats["action_#{a}"]||0
      b = vstats["action_#{b}"]||0
      b - a
    
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
    
    Concierge.container.off( 'click' ).on 'click', '.menu-action .inner, .menu .back', ( event )->
      event.preventDefault()
      Concierge.activateMenu $( this ).attr 'href'
    
    $('#menu_main').on 'click', '.action' , ->
      Concierge.visitor.incr $(this).attr( 'id' )
      
    if callback then callback.call Concierge
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

###
  Concierge.Action Class 
###
class Concierge.Action extends Concierge
  init: (  )->
    Concierge.decorate @json, href: "#{@name}_#{@json.type}"
    return @

###
  Concierge.Link Class
###
    
class Concierge.Link extends Concierge
  init: (  )->
    Concierge.decorate @json, href: "#{@name}_link"
    return @
   
###
  Concierge.Menu Class
###

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
  

    
###
  Visitor Class For Semi-Persistent Data Handling
###

class Concierge.Visitor
  constructor: ->
    @store = new window.Basil 
      namespace: 'g-a-b-0-0-1'
      storages: [ 'local', 'session', 'cookie' ]
      expireDays: 365
    return @
  incr: ( key )->
    v = @store.get key
    if !v then v = 0
    if v and isNaN v then throw new Error "NaN"
    @store.set key, ++v
    return @
  put: ( key, value )->
    @store.set key, value 
  get: ( key )->
    @store.get key
  del: ( key )->
    @store.remove key
  all: ()->
    vis = @
    keys = @store.keys()
    keys.reduce ( out, key )->
      out[key] = vis.get key
      return out
    , {}

###
  jQuery Widget For Link Box Cycling
###

class Concierge.LinkWidget
  
  constructor: ( el )->
    widget = @
    widget.$el = $ el
    widget.$el.on 'click', '.prev, .next', ( e )->
      e.preventDefault()
      dir = if $(this).hasClass 'prev' then -1 else 1
      widget.cycle( dir )
    widget.$el.find('.link:first').addClass 'active'
    return @
    
  cycle: ( dir )->
    widget = @
    if widget.busy then return false
    widget.busy = true
    $links = widget.$el.find '.link'
    $active = $links.filter '.active'
    if dir is -1
      $other = $active.prev('.link') 
      if $other.length is 0 then $other = $links.last()
    else
      $other = $active.next('.link') 
      if $other.length is 0 then $other = $links.first()
    $active.removeClass 'active'
    setTimeout ->
      $other.addClass 'active'
      setTimeout ->
        widget.busy = false
      , 200
    , 200
    return @
    
$.fn.linkWidget = ( )->
  $(this).each ->
    $el    = $( this )
    data = $el.data 'linkwidget'
    if !data
      $el.data 'linkwidget', data = new Concierge.LinkWidget( $el )
    return $el
    
$.fn.linkWidget.constructor = Concierge.LinkWidget
$.fn.linkWidget::=Concierge.LinkWidget::

$ -> 
  Concierge.init '#content', ->
    
    $( document ).on 'click', '.lang-en,.lang-fr', ( e )->
      e.preventDefault()
      clickLang = if $(this).hasClass('lang-en') then 'en' else 'fr'
      localLang = Concierge.getLang()
      if clickLang is localLang then return 
      Concierge.visitor.set 'lang', clickLang
      window.location.reload true 

    Concierge.activateMenu '#main_menu'

    $('.action .links').linkWidget()

    $(window).on 'popstate', ( event )->
      state = event.originalEvent.state
      if state then Concierge.activateMenu state.target
      
window.Concierge = Concierge

### jshint ignore:end ###