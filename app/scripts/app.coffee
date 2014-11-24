### jshint ignore:start ###
'use strict'
(->

  Handlebars.registerHelper "render_actions", ( obj, fn )->
    out = obj.map ( a )-> 
      a.render().html()
    new Handlebars.SafeString out.join('')
    
  location = window.history.location || window.location
  
  ###
    Base class for DRYer Code
  ###
  
  class Concierge
    
    ###
      Store the json locally for easier referencing
    ###
    @json: window.gabConciergeJSONConfig
    
    ###
      Starts the show!
    ###
    @init: ( container )->
      concierge = @
      ### Remove Welcome Screen ###
      @$el = $(container).empty()
      @menus = {}
      @destinations = {}
      ### attach named modules to main module for reference (and render templates to container ) ###
      Object.keys( @json.menu ).reduce ( self, menuname )-> 
        menu = new Menu( menuname )
        self["#{menuname}_menu"] = menu
        self.$el.append menu.render()
        return self
      , concierge
      
      Object.keys( @json.destination ).reduce ( self, destname )-> 
        destination = new Destination( destname )
        self["#{destname}_destination"] = destination
        self.$el.append destination.render()        
        return self
      , concierge
      
      $(container).on 'click', 'a', ( event )-> 
        event.preventDefault()
        target = $(this).attr('href').replace /.*#/, ''
        if concierge[target]
          concierge.activate concierge[target]
          
      $(window).on 'popstate', ( event )->
        state = event.originalEvent.state
        if state and concierge[state.target]
          concierge.activate concierge[state.target]
        
      @activate @main_menu
      return @
    
    ###
      Re-use jQuery Event methods
    ###
    @on: ( event, fn )->
      $( @ ).on( event, fn )
      return @
    @off: ( event, fn )->
      $( @ ).off( event, fn )
    ###
      Calling this method "once" instead of "one" should clue you in
      that these method signatures are more like the node.js event system than jQuery's.
    ###
    @once: ( event, fn )->
      $( @ ).one event, fn 
      
    @fire: ( event, data )->
      $( @ ).trigger event, data
    
    @reset: ( callback )->
      @$el.find('.active').removeClass('active')
      setTimeout callback, 200
      
    ###
      Handle An Action
    ###
    @activate: ( target )->
      c = @
      if @busy or @$el.is '.active' then return false
      @busy = true
      @reset ->
        target.show ->  
          historyMethod = 'replaceState'
          if history.state and history.state.target and history.state.target isnt target.domid      
            historyMethod = 'pushState'
          history[historyMethod] { target: target.domid }, c.name, "##{target.domid}"
          c.busy = false
      return @


    ###
      Based on json config file and builds a few utility class methods we can inherit
    ###
    constructor: ( name )->
      @type = @constructor.name.toLowerCase()
      @name  = name
      @domid  = "#{@name}_#{@type}"
      json = Concierge.json["#{@type}"]?[name] || Concierge.json
      Object.keys( json ).reduce ( self, key )->
        self[key]=json[key]
        self
      , @     
      return @
    
    ###
      Compiles the template on first run, then renders self with compiled template
    ###
    
    render: ()->
      if !@template
        templateSource = $("##{@constructor.name.toLowerCase()}-template").html()
        @template = Handlebars.compile templateSource
      @$el = $ @template @ 
      @$el.data @type, @
      return @$el
    
    ###
      Add "active" class to main element for css takeover of visual logic
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
      


    

  class Action extends Concierge
    constructor: ( actionname, @menu )->
      super actionname
      @href = "#{@name}_#{@type}"
      return @
      
  class Menu extends Concierge
    constructor: ( menuname )->
      super menuname
      menu = @
      @isMain = menuname is 'main'
      if @actions
        @actions = @actions.map ( actionname )-> 
          action = new Action actionname
          action.menu = menu
          return action
      return @

  class Destination extends Menu
    constructor: ( destname )->
      super destname
      
  
  Concierge.init '#content'
  
  
)()
### jshint ignore:end ###