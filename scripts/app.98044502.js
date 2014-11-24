
/* jshint ignore:start */
'use strict';
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(function() {
  var Action, Concierge, Destination, Menu, location;
  Handlebars.registerHelper("render_actions", function(obj, fn) {
    var out;
    out = obj.map(function(a) {
      return a.render().html();
    });
    return new Handlebars.SafeString(out.join(''));
  });
  location = window.history.location || window.location;

  /*
    Base class for DRYer Code
   */
  Concierge = (function() {

    /*
      Store the json locally for easier referencing
     */
    Concierge.json = window.gabConciergeJSONConfig;


    /*
      Starts the show!
     */

    Concierge.init = function(container) {
      var concierge;
      concierge = this;

      /* Remove Welcome Screen */
      this.$el = $(container).empty();
      this.menus = {};
      this.destinations = {};

      /* attach named modules to main module for reference (and render templates to container ) */
      Object.keys(this.json.menu).reduce(function(self, menuname) {
        var menu;
        menu = new Menu(menuname);
        self["" + menuname + "_menu"] = menu;
        self.$el.append(menu.render());
        return self;
      }, concierge);
      Object.keys(this.json.destination).reduce(function(self, destname) {
        var destination;
        destination = new Destination(destname);
        self["" + destname + "_destination"] = destination;
        self.$el.append(destination.render());
        return self;
      }, concierge);
      $(container).on('click', 'a', function(event) {
        var target;
        event.preventDefault();
        target = $(this).attr('href').replace(/.*#/, '');
        if (concierge[target]) {
          return concierge.activate(concierge[target]);
        }
      });
      $(window).on('popstate', function(event) {
        var state;
        state = event.originalEvent.state;
        if (state && concierge[state.target]) {
          return concierge.activate(concierge[state.target]);
        }
      });
      this.activate(this.main_menu);
      return this;
    };


    /*
      Re-use jQuery Event methods
     */

    Concierge.on = function(event, fn) {
      $(this).on(event, fn);
      return this;
    };

    Concierge.off = function(event, fn) {
      return $(this).off(event, fn);
    };


    /*
      Calling this method "once" instead of "one" should clue you in
      that these method signatures are more like the node.js event system than jQuery's.
     */

    Concierge.once = function(event, fn) {
      return $(this).one(event, fn);
    };

    Concierge.fire = function(event, data) {
      return $(this).trigger(event, data);
    };

    Concierge.reset = function(callback) {
      this.$el.find('.active').removeClass('active');
      return setTimeout(callback, 200);
    };


    /*
      Handle An Action
     */

    Concierge.activate = function(target) {
      var c;
      c = this;
      if (this.busy || this.$el.is('.active')) {
        return false;
      }
      this.busy = true;
      this.reset(function() {
        return target.show(function() {
          var historyMethod;
          historyMethod = 'replaceState';
          if (history.state && history.state.target && history.state.target !== target.domid) {
            historyMethod = 'pushState';
          }
          history[historyMethod]({
            target: target.domid
          }, c.name, "#" + target.domid);
          return c.busy = false;
        });
      });
      return this;
    };


    /*
      Based on json config file and builds a few utility class methods we can inherit
     */

    function Concierge(name) {
      var json, _ref;
      this.type = this.constructor.name.toLowerCase();
      this.name = name;
      this.domid = "" + this.name + "_" + this.type;
      json = ((_ref = Concierge.json["" + this.type]) != null ? _ref[name] : void 0) || Concierge.json;
      Object.keys(json).reduce(function(self, key) {
        self[key] = json[key];
        return self;
      }, this);
      return this;
    }


    /*
      Compiles the template on first run, then renders self with compiled template
     */

    Concierge.prototype.render = function() {
      var templateSource;
      if (!this.template) {
        templateSource = $("#" + (this.constructor.name.toLowerCase()) + "-template").html();
        this.template = Handlebars.compile(templateSource);
      }
      this.$el = $(this.template(this));
      this.$el.data(this.type, this);
      return this.$el;
    };


    /*
      Add "active" class to main element for css takeover of visual logic
     */

    Concierge.prototype.show = function(callback) {
      this.$el.addClass('active');
      return setTimeout(callback, 200);
    };


    /*
      Remove "active" class from main element
     */

    Concierge.prototype.hide = function() {
      this.$el.removeClass('active');
      return setTimeout(callback, 200);
    };

    return Concierge;

  })();
  Action = (function(_super) {
    __extends(Action, _super);

    function Action(actionname, menu) {
      this.menu = menu;
      Action.__super__.constructor.call(this, actionname);
      this.href = "" + this.name + "_" + this.type;
      return this;
    }

    return Action;

  })(Concierge);
  Menu = (function(_super) {
    __extends(Menu, _super);

    function Menu(menuname) {
      var menu;
      Menu.__super__.constructor.call(this, menuname);
      menu = this;
      this.isMain = menuname === 'main';
      if (this.actions) {
        this.actions = this.actions.map(function(actionname) {
          var action;
          action = new Action(actionname);
          action.menu = menu;
          return action;
        });
      }
      return this;
    }

    return Menu;

  })(Concierge);
  Destination = (function(_super) {
    __extends(Destination, _super);

    function Destination(destname) {
      Destination.__super__.constructor.call(this, destname);
    }

    return Destination;

  })(Menu);
  return Concierge.init('#content');
})();


/* jshint ignore:end */
