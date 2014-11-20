
/* jshint ignore:start */
'use strict';
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(function() {
  var Action, Concierge, Destination, Menu;
  Handlebars.registerHelper("render_actions", function(obj, fn) {
    var out;
    out = obj.map(function(a) {
      return a.render().html();
    });
    return new Handlebars.SafeString(out.join(''));
  });

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
      $(container).empty();
      this.menus = {};
      this.destinations = {};

      /* attach named modules to main module for reference (and render templates to container ) */
      Object.keys(this.json.menu).reduce(function(self, menuname) {
        var menu;
        menu = new Menu(menuname);
        self["" + menuname + "_menu"] = menu;
        $(container).append(menu.render());
        return self;
      }, concierge);
      Object.keys(this.json.destination).reduce(function(self, destname) {
        var destination;
        destination = new Destination(destname);
        self["" + destname + "_destination"] = destination;
        $(container).append(destination.render());
        return self;
      }, concierge);
      $(container).on('click', '.action a', function(event) {
        var target_name;
        event.preventDefault();
        target_name = $(this).attr('href').replace('#', '');
        $('.active').data('menu').hide();
        return concierge[target_name].show();
      });
      this.main_menu.show();
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

    Concierge.prototype.show = function() {
      return this.$el.addClass('active');
    };


    /*
      Remove "active" class from main element
     */

    Concierge.prototype.hide = function() {
      return this.$el.removeClass('active');
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
