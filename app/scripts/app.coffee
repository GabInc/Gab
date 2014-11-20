### jshint ignore:start ###
'use strict'
(->

  Handlebars.registerHelper "render_actions", ( obj, fn )->
    out = obj.map ( a )-> a.render().html()
    new Handlebars.SafeString out.join('')
    
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
      $(container).empty()
      @menus = {}
      @destinations = {}
      ### attach named modules to main module for reference (and render templates to container ) ###
      Object.keys( @json.menu ).reduce ( self, menuname )-> 
        menu = new Menu( menuname )
        self["#{menuname}_menu"] = menu
        $(container).append menu.render()
        return self
      , concierge
      Object.keys( @json.destination ).reduce ( self, destname )-> 
        destination = new Destination( destname )
        self["#{destname}_destination"] = destination
        $(container).append destination.render()        
        return self
      , concierge
      
      $(container).on 'click', '.action a', ( event )->
        event.preventDefault()
        target_name = $(this).attr('href').replace '#', ''
        $('.active').data('menu').hide()
        concierge[target_name].show()

      @main_menu.show()
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
    show: ( )->
      @$el.addClass 'active'
      
    ###
      Remove "active" class from main element
    ###
    hide: ( )->
      @$el.removeClass 'active'
      

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