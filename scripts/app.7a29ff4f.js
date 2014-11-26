(function() {
  'use strict';

  /* jshint ignore:start */
  var Concierge, location,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Handlebars.registerHelper("render_actions", function(obj, fn) {
    var out;
    out = obj.map(function(name) {
      var rendered;
      rendered = Concierge.render(Concierge.action[name]);
      return rendered.get(0).outerHTML;
    });
    return new Handlebars.SafeString(out.join(''));
  });

  Handlebars.registerHelper("render_links", function(obj, fn) {
    var out;
    out = obj.map(function(name) {
      var rendered;
      rendered = Concierge.render(Concierge.link[name]);
      return rendered.get(0).outerHTML;
    });
    return new Handlebars.SafeString(out.join(''));
  });

  location = window.history.location || window.location;


  /*
    Base class for DRYer Code
   */

  Concierge = (function() {
    Concierge.decorate = function(object, properties) {
      var key, val;
      for (key in properties) {
        val = properties[key];
        object[key] = val;
      }
      return object;
    };


    /* Store JSON locally to the class */

    Concierge.json = window.gabConciergeJSONConfig;

    Concierge.resetMenus = function(callback) {
      Concierge.container.find('.menu.active').removeClass('active');
      return setTimeout(callback, 200);
    };

    Concierge.activateMenu = function(href) {
      var name;
      if (Concierge.busy) {
        return false;
      }
      Concierge.busy = true;
      name = href.replace(/#|_menu/g, '');
      Concierge.resetMenus(function() {
        return Concierge.menu[name].show(function() {
          var historyMethod;
          Concierge.busy = false;
          historyMethod = 'replaceState';
          if (history.state && history.state.target && history.state.target !== href) {
            historyMethod = 'pushState';
          }
          return history[historyMethod]({
            target: href
          }, name, "" + href);
        });
      });
      return this;
    };

    Concierge.init = function(container) {
      Concierge.container = $(container).empty();

      /* Read JSON data and build proper Class Instances */
      Object.keys(Concierge.json).forEach(function(klass) {
        Concierge[klass] = {};
        return Object.keys(Concierge.json[klass]).reduce(function(mapping, name) {
          mapping[name] = Concierge.factory(klass, name);
          mapping[name].init();
          return mapping;
        }, Concierge[klass]);
      });
      Object.keys(Concierge.menu).forEach(function(name) {
        var render;
        render = Concierge.render(Concierge.menu[name]);
        return Concierge.container.append(render);
      });
      Concierge.container.on('click', '.menu-action .inner, .menu .back', function(event) {
        event.preventDefault();
        return Concierge.activateMenu($(this).attr('href'));
      });
      return Concierge;
    };

    Concierge.factory = function(klass, name) {
      var Klass;
      Klass = klass[0].toUpperCase() + klass.slice(1);
      return new Concierge[Klass](name);
    };

    Concierge.render = function(instance) {
      var $el, classname, render, templateSource;
      classname = instance.classname;
      templateSource = $("#" + classname + "_template").html();
      render = Handlebars.compile(templateSource);
      $el = $(render(instance.json));
      $el.data(classname, instance);
      instance.$el = $el;
      return $el;
    };


    /*
      Inheritable Constructor for DRYness
     */

    function Concierge(name) {
      this.name = name;
      this.classname = this.constructor.name.toLowerCase();
      this.json = Concierge.json[this.classname][this.name];
      Concierge.decorate(this.json, {
        name: this.name,
        classname: this.classname,
        domid: "" + this.classname + "_" + this.name
      });
      return this;
    }

    return Concierge;

  })();

  Concierge.Action = (function(_super) {
    __extends(Action, _super);

    function Action() {
      return Action.__super__.constructor.apply(this, arguments);
    }

    Action.prototype.init = function() {
      Concierge.decorate(this.json, {
        href: "" + this.name + "_" + this.json.type
      });
      return this;
    };

    return Action;

  })(Concierge);

  Concierge.Link = (function(_super) {
    __extends(Link, _super);

    function Link() {
      return Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.init = function() {
      Concierge.decorate(this.json, {
        href: "" + this.name + "_link"
      });
      return this;
    };

    return Link;

  })(Concierge);

  Concierge.Menu = (function(_super) {
    __extends(Menu, _super);

    function Menu() {
      return Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.init = function() {
      this.isMain = this.name === 'main';
      Concierge.decorate(this.json, {
        href: "" + this.name + "_" + this.json.type
      });
      return this;
    };


    /*
      Toggles visible states of menus
     */

    Menu.prototype.show = function(callback) {
      this.$el.addClass('active');
      return setTimeout(callback, 200);
    };


    /*
      Remove "active" class from main element
     */

    Menu.prototype.hide = function() {
      this.$el.removeClass('active');
      return setTimeout(callback, 200);
    };

    return Menu;

  })(Concierge);

  Concierge.Visitor = (function() {
    function Visitor() {
      true;
    }

    return Visitor;

  })();

  $(function() {
    Concierge.init('#content');
    Concierge.activateMenu('#main_menu');
    return $(window).on('popstate', function(event) {
      var state;
      state = event.originalEvent.state;
      if (state) {
        return Concierge.activateMenu(state.target);
      }
    });
  });


  /* jshint ignore:end */

}).call(this);
