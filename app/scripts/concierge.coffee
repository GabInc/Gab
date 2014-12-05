"use strict"

grunticon( [ "styles/concierge-icons-data-svg.css", "styles/concierge-icons-data-png.css", "styles/concierge-icons-fallback.css" ] );


###
# GABConcierge v0.0.1
# 
#
# Author: Francois Lafortune aka: @AKRFranko
# Author Email: franko@akr.club
# Owner: GAB.
###


jQuery = window.jQuery # use .noConflict() if necessary


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
SUPPORTED_LANGUAGES = ['en_CA','fr_CA']
DEFAULT_LANGUAGE = 'en_CA'

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
    
    menus = ['en_CA','fr_CA'].reduce ( data, locale )->
      data[locale] = Object.keys(json[locale].menu).map ( n )-> json[locale].menu[n]
      return data
    , {}
      
    ui = new Ractive
      el: 'content'
      template: '{{#menus}}{{>menu_template}}{{/menus}}'
      data: menus: menus.en_CA
      partials: 
        menu_template:  jQuery('#menu_template').html()
        action_partial: jQuery('#action_partial').html()
        link_partial:   jQuery('#link_partial').html()
    $('#main_menu').addClass('active')

    $( document ).on 'click', '.action.action-menu', ( event )->
      event.preventDefault()
      target = $(this).data('target')
      $('.menu.active').removeClass('active')
      $("##{target}_menu").addClass 'active'
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
    
$('#content').empty()
window[LIB_NAME] = new Concierge "gab-concierge-#{SEMVER}", window[LIB_NAME]
$('.navigation').on 'click', ()-> $( this ).toggleClass('open')
$('.search').on 'click', -> $( this ).toggleClass('huge').find('input').focus()

