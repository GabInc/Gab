###
# GABConcierge v0.0.1
# 
#
# Author: Francois Lafortune aka: @AKRFranko
# Author Email: franko@akr.club
# Owner: GAB.
###
(( globalContext )->
  
  jQuery = globalContext.jQuery # use .noConflict() if necessary
  Pure   = globalContext.$p # should maybe have a noConflict()? check their api.
  
  # Exported Variable Name ( Must be same as JSON data variable name )
  LIB_NAME = "GABConcierge"
  
  # Concierge Version
  SEMVER = "v0.0.1"

  # Reserved Module Keywords
  MODULE_KEYWORDS = [ 
    'extended'
    'included'
    'module_type'
    'module_name'
    'instance_name'
    'instance_type' 
  ]
  
  
  # Supported Languages
  SUPPORTED_LANGUAGES = Object.keys globalContext[LIB_NAME].i18n
  DEFAULT_LANGUAGE = 'en'
  
  # Daily Time Range Block Mapping
  dailyTimeRangeMap=
    morning_early: 
      start: moment().hours(6).minutes(0).seconds(0)
      end:   moment().hours(8).minutes(59).seconds(0)
    morning_late: 
      start: moment().hours(9).minutes(0).seconds(0)
      end:   moment().hours(11).minutes(59).seconds(0)
    afternoon_early:
      start: moment().hours(12).minutes(0).seconds(0)
      end:   moment().hours(14).minutes(59).seconds(0)
    afternoon_late:
      start: moment().hours(15).minutes(0).seconds(0)
      end:   moment().hours(17).minutes(59).seconds(0)
    evening_early:
      start: moment().hours(18).minutes(0).seconds(0)
      end:   moment().hours(20).minutes(59).seconds(0)
    evening_late:
      start: moment().hours(21).minutes(0).seconds(0)
      end:   moment().hours(23).minutes(59).seconds(0)
    night_early:
      start: moment().hours(24).minutes(0).seconds(0)
      end:   moment().hours(3).minutes(59).seconds(0)
  
  ###
  # Utilities
  ###
  
  # util: getCurrentTimeRange(), get time range name from hard-coded above.
  getCurrentTimeRange = ( map=dailyTimeRangeMap )->
      now = moment()
      names = Object.keys 
      for name of names 
        range = map[name]
        return name if now.isAfter( range.begins ) and now.isBefore( range.ends )
      return 'must_be_inside_the_tardis'
      
  # util: safeJSON(), stringifies external JSON and parses it again natively for safety .
  safeJSON = ( json )-> JSON.parse JSON.stringify json
  
  # util: domName() Lowercase and joins arguments with '_', ignoring falsy values and removing crap.
  domName = ( names... )-> 
    names.unshift 'gab'
    names.filter( ( v )-> !!v ).join('_').toLowerCase().replace(/[^\d\w-]/g, '')  
  
  # util: sortObject() Generates a sort function to sort object collection by `attribute` in `direction` [desc|asc] default: desc
  sortObjects = ( attribute, direction )-> 
    direction ?= 'desc'
    if typeof attribute is 'function' then getattr = attribute
    else getattr = -> attribute
    return if direction is 'asc' then ( a, b )-> a[getattr.call( a )] - b[getattr.call( b )]
    else ( a, b )-> b[getattr.call( b )] - a[getattr.call( a )]
    
  
  ###
  # Basil.js Data Store
  ###
  store = new Basil namespace: "GAB-#{SEMVER}" , storage: 'local', expireDays: 3650
  
  ###
  # Headless Prototypes
  ###
    
  ###
    Prototype: Custom Interface To Basil Store
    Include these to provide your Module with 
    browser-persisted storage.
  ###
  persisted=
    isPersisted: true
    # altnames
    set: ( key, value )-> persisted.put.call @, key, value
    getset: ( key, value )-> persisted.getput.call @, key, value
    # get all keys related to this instance
    getall: ()->
      localns = new RegExp "^#{domName( @module_type, @instance_name )}_"
      store.keys().reduce ( all, key )->
        if localns.test key
          localkey = key.replace localns, ''
          all[localkey] = store.get key
        return all
      , {}      
    # get value stored at 'key' and update it to 'value' returning the old value
    getput: ( key, value )->
      key = domName @module_type, @instance_name, key 
      retval = store.get key 
      store.set( key, value )
      return retval
    # get value stored at 'key' and deletes it
    getdel: ( key )->
      key = domName @module_type,  @instance_name, key 
      retval = store.get( key )
      store.remove( key )
      return retval      
    # put 'value' at 'key' 
    put: ( key, value )->
      key = domName @module_type, @instance_name, key 
      store.set key, value 
      return value
    # get value of 'key'      
    get: ( key )->
      key = domName @module_type, @instance_name, key 
      return store.get key
    # delete value at 'key'            
    del: ( key )->
      key = domName @module_type, @instance_name, key 
      store.remove key
      return null
    # increments 'key' by one (auto created)
    incr: ( key )->
      key = domName @module_type, @instance_name, key 
      v = store.get key
      if !v then v = 0
      throw new TypeError "#{key} is not a number!" if isNaN v
      store.set key, ++v
      return v
    # decrements 'key' by one (auto created)     
    decr: ( key )->
      key = domName @module_type,  @instance_name, key 
      v = store.get key
      if !v then v = 0
      throw new TypeError "#{key} is not a number!" if isNaN v
      store.set key, --v
      return v

  ###
    Prototype: Proxied jQuery Event Methods
    Include these to provide your Module with 
    an evented system.
  ###
  evented=
    isEvented: true
    on: ( eventName, handle )->
      ns = domName @module_type,  @instance_name
      jQuery( document ).on "#{eventName}.#{ns}", handle
      return @
    off: ( eventName, handle )->
      ns = domName @module_type,  @instance_name
      jQuery( document ).off "#{eventName}.#{ns}", handle
      return @
    one: ( eventName, handle )->
      ns = domName @module_type,  @instance_name
      jQuery( document ).one "#{eventName}.#{ns}", handle
      return @
    trigger: ( eventName, data )->
      ns = domName @module_type,  @instance_name
      jQuery( document ).trigger "#{eventName}.#{ns}", data
      return @

  ###
    Prototype: jQuery Pluginize
    Include these to provide your Module with 
    a jQuery plugin interface.
  ###  
  pluggable=
    isPluggable: true
    included: ->
      instance = @
      runCommand = ( command, args )-> instance[command].apply instance, args
      bindPlugin = ->
        data  = @data instance.module_type
        if data isnt instance
          @data instance.module_type, intance
        return @
      jQuery.fn[@instance_name]=( command, args... )->
        return jQuery( this ).each ->
          if command and instance[command] then runCommand command, args
          bindPlugin.call $ this
      jQuery.fn[@instance_name].constructor=instance.constructor
      jQuery.fn[@instance_name]::=instance.constructor::
      instance.plugin = jQuery.fn[@instance_name]
      
  ###
    Prototype: Rendering Provided By Ractive
    Include these to provide your Module with 
    a Ractive templating interface.
  ###
  # renderable=
  #   isRenderable: true
  #   template_name: null
  #   render_container: null
  #   included: ->
  #     ropts = {}
  #     if @template_name
  #       ropts.template = "##{@template_name || "#{@module_type}_template" }"
  #     if @render_container
  #       ropts.el = @render_container
  #     template = new Ractive ropts
  #     if @template_name and /_partial$/.test @template_name
  #       Ractive.partials[@template_name]=template
  #     @::template = template

    
  ### 
  #  Module Stuff for Prototypal Inheritance Fun.
  # 
  #  This is our basic internal meta-magic!
  ###
  
  class Module
    # Provides a simple syntax to map more complex names for type checking.
    @name_module: ( value )->
      module_type = value.toLowerCase().split(':').reverse().join('_')
      module_name = value.toLowerCase().split(':').reverse().reduce ( n, s )-> 
        n + s[0].toUpperCase() + s.slice(1)
      , ''
      @module_name   = module_name
      @::module_name = module_name
      @module_type   = module_type
      @::module_type = module_type
      this
      
    # Inherits `obj` on <Module>
    @extend: (obj) ->
      for key, value of obj when key not in MODULE_KEYWORDS
        @[key] = value
      obj.extended?.apply(@) # Post extend
      this
      
    # Inherits `obj` on <Module> prototype
    @include: (obj) ->
      for key, value of obj when key not in MODULE_KEYWORDS
        # Assign properties to the prototype
        @::[key] = value
      obj.included?.apply(@) # Post include
      this
      
  ###
  #  Concierge Lib Wrapper
  #
  #  Eventually exported to the global context as a Singleton,
  #  this is pretty much just a huge constructor to wrap all initializations.
  #  
  #  This is our core library meta-magic!
  ###
  class Concierge extends Module
    @name_module 'core:concierge'
    @include persisted
    ###
    # Anything that can or must run before the DOM is loaded can be handled here.
    ###
    constructor: ( @instance_name, json )->
      if !@instance_name then throw new Error "Instance name required"      
      @instance_type = "#{@module_type}_instance"
      # Stop __super__ inheritance chain here!
      return @ if @module_name isnt 'ConciergeCore'
      ###
        Initialize "Visitor" instance
      ###
      Concierge.visitor = new Visitor "concierge-visitor"
      Concierge.current_language_choice = Concierge.visitor.get 'language_choice' 
      
      ###
        Local accessors for "added speed"
      ###
      Concierge.link   = {}
      Concierge.action = {}
      Concierge.menu   = {}
      name_reference=
        menu:   Object.keys   json.structure.menu
        action: Object.keys   json.structure.action
        link:   Object.keys   json.structure.link
        
      module_reference=[
          [ 'menu',   Menu   ]
          [ 'action', Action ]
          [ 'link',   Link   ]
      ]
      
      ###
        Sort main menu actions based on storage scores
      ###
      json.structure.menu.main.actions.sort ( a, b )->
        aScore = Concierge.visitor.get( "#{a}_clicks" )||0
        bScore = Concierge.visitor.get( "#{b}_clicks" )||0
        return bScore - aScore
      
      ###
        Internationalize structure in a cascading fashion.
      ###
      stringified    = JSON.stringify json.structure
      translatable_keys = ['title','text','label','description','caption']
      SUPPORTED_LANGUAGES.reduce ( structures, lang )->
        i18n json.i18n[lang] 
        structures[lang] = JSON.parse stringified, ( key, value )->
          return value unless key in translatable_keys 
          return i18n._ value
        return structures
      , Concierge.structures = { default: json.structure  }
      # note: @structures === { en: <json.structure> ,fr: <json.structure> }

      ###
        Set Current Time Range
      ###
      Concierge.current_time_range = getCurrentTimeRange()
      
      ###
        Init SubClasses
      ###
      module_reference.reduce ( concierge, reference )->
        [ module_type, module_constructor ] = reference
        name_reference[ module_type ].map ( data_name )->
          json = SUPPORTED_LANGUAGES.reduce ( json, lang )->
            json[lang] = Concierge.structures[ lang ][ module_type ][ data_name ]
            json[lang]["#{module_type}_name"] = data_name
            if data_name is 'main'
              json[lang].isMainMenu = true
            return json
          , {}
          Concierge[module_type][data_name] = new module_constructor data_name, json
        return concierge
      , Concierge

            
      # ###
      #   Render UI
      # ###
      # Concierge.current_target = Concierge.menu.main
      menus = Object.keys(Concierge.menu).map ( name )->
        Concierge.menu[name].toJSON()
      ui = new Ractive
        el: 'content'
        template: '{{#menus}}{{>menu_template}}{{/menus}}'
        data: menus: menus
        partials: 
          menu_template:  jQuery('#menu_template').html()
          action_partial: jQuery('#action_partial').html()
          link_partial:   jQuery('#link_partial').html()

      $('#main_menu').addClass('show')
      
      $( document ).on 'click', '.action.action-menu', ( event )->
        event.preventDefault()
        target = $(this).data('target')
        $('.menu.show').removeClass('show')
        $("##{target}_menu").addClass 'show'
      return @
        

  ###
    Visitor Class
    # extends Concierge # extends Module
  ###
  class Visitor extends Concierge
    @name_module 'visitor'
    # @extend navigator # <-- this works!
    @include persisted
    constructor: ( instance_name )-> 
      visitor = @
      super instance_name # stay integral to our pattern 
      last_time = visitor.get( 'last_visit' ) || 0
      current_time = new Date().getTime()
      # Use for live refresh?
      visitor.put 'last_window_refresh', current_time
      visitor.put 'time_since_last_visit', current_time - last_time
      $( window ).unload -> 
        visitor.put 'last_visit', new Date().getTime()
      # get/or autoset language
      lang = visitor.get 'language_choice'
      browser_lang  = navigator.language.replace(/-.+$/,'')
      if !lang then visitor.put 'language_choice', if browser_lang in SUPPORTED_LANGUAGES then browser_lang else DEFAULT_LANGUAGE
      return @
      
  ###
    UI Class # extends Concierge # extends Module
    
    This is the user interface meta-magic!
    Use as an "includes" container for UI relevant classes to inherit
  ###
  class UI extends Concierge 
    @name_module 'core:ui:concierge'
    @include evented
    constructor: ( name, @structuredData={} )-> 
      super( name )
    # toJSON: -> @structuredData

  ###
    Action Class # extends UI # extends Concierge # extends Module
    
    BaaAAAM! Action Time!
  ###
  class Action extends UI 
    @name_module 'action'
    @include pluggable
    toJSON: ()->
      data = @structuredData[ Concierge.current_language_choice ]
      if data and data.links
        data.hasLinks = true
        data.links = data.links.map ( n )->
          return n unless typeof n is 'string' 
          link = Concierge.link[ n ]
          if link.toJSON then link.toJSON() else link
      return data

  ###
    Menu Class # extends UI # extends Concierge # extends Module
    
    Would you like to see the menu?
  ###
  class Menu extends UI 
    @name_module 'menu'
    @include pluggable
    toJSON: ->
      data = @structuredData[ Concierge.current_language_choice ]
      if data and data.actions
        data.hasActions = true
        data.actions = data.actions.map ( n )-> 
          return n unless typeof n is 'string'
          action = Concierge.action[ n ]
          if action.toJSON then action.toJSON() else action
      return data

  ###
    Link Class # extends UI # extends Concierge # extends Module
    
    I think it's at http://g-a-b.co!
  ###
  class Link extends UI 
    @name_module 'menu'
    @include pluggable
    toJSON: ->
      data = @structuredData[ Concierge.current_language_choice ]
      

  ### Export Concierge to Saint-Gleton (lol, i meant globalContext) ###
  $('#content').empty()
  globalContext[LIB_NAME] = new Concierge "gab-concierge-#{SEMVER}", globalContext[LIB_NAME]
  # ['link','action','menu'].map ( name )-> globalContext[LIB_NAME][name] = Concierge[name]
  $('.navigation').on 'click', ()-> $( this ).toggleClass('open')
  $('.search').on 'click', -> $( this ).toggleClass('huge').find('input').focus()
)( this )