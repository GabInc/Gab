(function() {
  'use strict';

  /* jshint ignore:start */
  var Concierge, location,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  location = window.history.location || window.location;

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

    Concierge.getJSON = function(lang) {
      var stringified, translate_keys;
      if (lang == null) {
        lang = this.getLang();
      }
      translate_keys = ['title', 'description', 'text'];
      stringified = JSON.stringify(GABJSON.concierge);
      i18n(GABJSON.i18n[lang]);
      return JSON.parse(stringified, function(k, v) {
        if (__indexOf.call(translate_keys, k) >= 0) {
          return i18n._(v);
        }
        return v;
      });
    };

    Concierge.getLang = function() {
      return this.visitor.get('lang') || (navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage).replace(/-.+/, '');
    };

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

    Concierge.init = function(container, callback) {
      var vstats;
      Concierge.visitor = new Concierge.Visitor();
      Concierge.container = $(container).empty();
      Concierge.json = Concierge.getJSON();
      vstats = Concierge.visitor.all();
      Concierge.json.menu.main.actions.sort(function(a, b) {
        a = vstats["action_" + a] || 0;
        b = vstats["action_" + b] || 0;
        return b - a;
      });

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
      Concierge.container.off('click').on('click', '.menu-action .inner, .menu .back', function(event) {
        event.preventDefault();
        return Concierge.activateMenu($(this).attr('href'));
      });
      $('#menu_main').on('click', '.action', function() {
        return Concierge.visitor.incr($(this).attr('id'));
      });
      if (callback) {
        callback.call(Concierge);
      }
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


  /*
    Concierge.Action Class
   */

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


  /*
    Concierge.Link Class
   */

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


  /*
    Concierge.Menu Class
   */

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


  /*
    Visitor Class For Semi-Persistent Data Handling
   */

  Concierge.Visitor = (function() {
    function Visitor() {
      this.store = new window.Basil({
        namespace: 'g-a-b-0-0-1',
        storages: ['local', 'session', 'cookie'],
        expireDays: 365
      });
      return this;
    }

    Visitor.prototype.incr = function(key) {
      var v;
      v = this.store.get(key);
      if (!v) {
        v = 0;
      }
      if (v && isNaN(v)) {
        throw new Error("NaN");
      }
      this.store.set(key, ++v);
      return this;
    };

    Visitor.prototype.put = function(key, value) {
      return this.store.set(key, value);
    };

    Visitor.prototype.get = function(key) {
      return this.store.get(key);
    };

    Visitor.prototype.del = function(key) {
      return this.store.remove(key);
    };

    Visitor.prototype.all = function() {
      var keys, vis;
      vis = this;
      keys = this.store.keys();
      return keys.reduce(function(out, key) {
        out[key] = vis.get(key);
        return out;
      }, {});
    };

    return Visitor;

  })();


  /*
    jQuery Widget For Link Box Cycling
   */

  Concierge.LinkWidget = (function() {
    function LinkWidget(el) {
      var widget;
      widget = this;
      widget.$el = $(el);
      widget.$el.on('click', '.prev, .next', function(e) {
        var dir;
        e.preventDefault();
        dir = $(this).hasClass('prev') ? -1 : 1;
        return widget.cycle(dir);
      });
      widget.$el.find('.link:first').addClass('active');
      return this;
    }

    LinkWidget.prototype.cycle = function(dir) {
      var $active, $links, $other, widget;
      widget = this;
      if (widget.busy) {
        return false;
      }
      widget.busy = true;
      $links = widget.$el.find('.link');
      $active = $links.filter('.active');
      if (dir === -1) {
        $other = $active.prev('.link');
        if ($other.length === 0) {
          $other = $links.last();
        }
      } else {
        $other = $active.next('.link');
        if ($other.length === 0) {
          $other = $links.first();
        }
      }
      $active.removeClass('active');
      setTimeout(function() {
        $other.addClass('active');
        return setTimeout(function() {
          return widget.busy = false;
        }, 200);
      }, 200);
      return this;
    };

    return LinkWidget;

  })();

  $.fn.linkWidget = function() {
    return $(this).each(function() {
      var $el, data;
      $el = $(this);
      data = $el.data('linkwidget');
      if (!data) {
        $el.data('linkwidget', data = new Concierge.LinkWidget($el));
      }
      return $el;
    });
  };

  $.fn.linkWidget.constructor = Concierge.LinkWidget;

  $.fn.linkWidget.prototype = Concierge.LinkWidget.prototype;

  $(function() {
    return Concierge.init('#content', function() {
      $(document).on('click', '.lang-en,.lang-fr', function(e) {
        var clickLang, localLang;
        e.preventDefault();
        clickLang = $(this).hasClass('lang-en') ? 'en' : 'fr';
        localLang = Concierge.getLang();
        if (clickLang === localLang) {
          return;
        }
        Concierge.visitor.set('lang', clickLang);
        return window.location.reload(true);
      });
      Concierge.activateMenu('#main_menu');
      $('.action .links').linkWidget();
      return $(window).on('popstate', function(event) {
        var state;
        state = event.originalEvent.state;
        if (state) {
          return Concierge.activateMenu(state.target);
        }
      });
    });
  });

  window.Concierge = Concierge;


  /* jshint ignore:end */

}).call(this);
