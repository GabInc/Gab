<<<<<<< HEAD
# Generated on 2014-11-05 using generator-angular 0.9.8
# Updated by hand afterwards.

"use strict"

# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
  
  
  fs = require 'fs'
  
  # Time how long tasks take. Can help when optimizing build times
  require("time-grunt") grunt
  
  # Configurable paths for the application
  appConfig =
    app: require("./bower.json").appPath or "app"
    dist: "dist"

=======
# Generated on 2014-12-04 using
# generator-webapp 0.5.1
"use strict"
fs = require "fs"
# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# If you want to recursively match all subfolders, use:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
  
  # Time how long tasks take. Can help when optimizing build times
  require("time-grunt") grunt
  
  # Load grunt tasks automatically
  require("load-grunt-tasks") grunt
  
  pkg = require './package.json'
  # Configurable paths
  config =
    app: "app"
    dist: "dist"
    appname: "GABConcierge" # NB: exported to front-end as variable name
    appversion: pkg.version # NB: exported to front-end as 'string'
>>>>>>> bare
  
  # Define the configuration for all the tasks
  grunt.initConfig
    
    # Project settings
<<<<<<< HEAD
    yeoman: appConfig
    
    svgmin: 
        options: 
            plugins: [ { removeViewBox: false }, {removeUselessStrokeAndFill: false} ]
        files: ["<%= yeoman.dist %>/images/svg/**/*.svg"]
    
    'gh-pages':
      options: 
        base: 'dist'
      src: ['**']
      
    # svgstore:
    #   options: 
    #     prefix: "gab_icon_"
    #   default: 
    #     files: 
    #       "<%= yeoman.app %>/images/svg/gab_icons_en.svg": "<%= yeoman.app %>/images/svg/en/*.svg"
    #       "<%= yeoman.app %>/images/svg/gab_icons_fr.svg": "<%= yeoman.app %>/images/svg/fr/*.svg"
      
    coffee:
      compile:
        options:
          bare: false
        files:
          "<%= yeoman.app %>/scripts/app.js": "<%= yeoman.app %>/scripts/app.coffee"

    less:
      compile:
        files:
          "<%= yeoman.app %>/styles/main.css": "<%= yeoman.app %>/styles/main.less"

    # Watches files for changes and runs tasks based on the changed files
    watch:
      
      # svgmin: 
      #   files: ["<%= yeoman.app %>/images/**/*.svg"]
      #   tasks: ["svgmin"]
        
      # svgstore:
      #   files: ["<%= yeoman.app %>/images/**/*.svg"]
      #   tasks: ["svgstore"]
        
      coffee:
        files: ["<%= yeoman.app %>/scripts/*.coffee"]
        tasks: ["coffee"]

      less:
        files: ["<%= yeoman.app %>/styles/*.less"]
        tasks: ["less"]

      bower:
        files: ["bower.json"]
        tasks: ["wiredep"]

      js:
        files: ["<%= yeoman.app %>/scripts/{,*/}*.js"]
        tasks: ["newer:jshint:all"]
        options:
          livereload: "<%= connect.options.livereload %>"

      jsTest:
        files: ["test/spec/{,*/}*.js"]
        tasks: [
          "newer:jshint:test"
          # "karma"
        ]
      
      styles:
        files: ["<%= yeoman.app %>/styles/{,*/}*.css"]
        tasks: [
          "newer:copy:styles"
          "autoprefixer"
        ]

      gruntfile:
        files: ["Gruntfile.coffee"]

=======
    config: config
    
    # Before i18n'ing the JSON, we need to merge it into useable/translatable files
    merge_data: 
      structures:
        options: 
          data: ( data )->
            links = Object.keys(data.link).reduce ( named, k )->
              link = data.link[k]
              link.link_name = k
              named[k] = link
              return named
            , {}
            actions = Object.keys(data.action).reduce ( named, k )->
              action = data.action[k]
              action.action_name = k
              if action.links and action.links.length
                action.hasLinks = true
                action.links = action.links.map ( name )-> links[name]
              named[k] = action
              return named
            , {}
            menus = Object.keys(data.menu).reduce ( named, k )->
              menu = data.menu[k]
              menu.menu_name = k
              if k is 'main' then menu.isMainMenu = true
              if menu.actions and menu.actions.length 
                menu.hasActions = true
                menu.actions = menu.actions.map ( name )-> actions[name]
              named[k] = menu
              return named
            , {}
            data.action = actions
            data.link = links
            data.menu = menus
            return data
        src: [ "<%= config.app %>/sources/structure/*.json", "!<%= config.app %>/sources/structure/generated-template.json"]
        dest: "<%= config.app %>/sources/structure/generated-template.json"
          
    # So always use the previous task before this one!
    gab_json_i18n:
      main:
        template: "<%= config.app %>/sources/structure/generated-template.json"
        locales: "<%= config.app %>/sources/locales"
        output: "<%= config.app %>/scripts/concierge-data.js"
      
    # Watches files for changes and runs tasks based on the changed files
    watch:
      bower:
        files: ["bower.json"]
        tasks: ["wiredep"]
        
      less:
        files: ["<%= config.app %>/styles/{,*/}*.less"]
        tasks: ["less:dist","autoprefixer", "wiredep"]
        
      coffee:
        files: ["<%= config.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}"]
        tasks: ["coffee:dist", "wiredep"]

      coffeeTest:
        files: ["test/spec/{,*/}*.{coffee,litcoffee,coffee.md}"]
        tasks: [
          "coffee:test"
          "test:watch"
        ]

      gruntfile:
        files: ["Gruntfile.coffee"]

      styles:
        files: ["<%= config.app %>/styles/{,*/}*.css"]
        tasks: [
          "copy:styles"
          "autoprefixer"
        ]

>>>>>>> bare
      livereload:
        options:
          livereload: "<%= connect.options.livereload %>"

        files: [
<<<<<<< HEAD
          "<%= yeoman.app %>/{,*/}*.html"
          ".tmp/styles/{,*/}*.css"
          "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
=======
          "<%= config.app %>/{,*/}*.html"
          ".tmp/styles/{,*/}*.css"
          ".tmp/scripts/{,*/}*.js"
          "<%= config.app %>/images/{,*/}*"
>>>>>>> bare
        ]

    
    # The actual grunt server settings
    connect:
<<<<<<< HEAD
      options:
        port: 9000
        
        # Change this to '0.0.0.0' to access the server from outside.
        hostname: "0.0.0.0"
        livereload: 35729

      livereload:
        options:
          open: true
          middleware: (connect) ->
            [
              connect.static(".tmp")
              connect().use("/bower_components", connect.static("./bower_components"))
              connect.static(appConfig.app)
            ]

      test:
        options:
          port: 9001
          middleware: (connect) ->
            [
              connect.static(".tmp")
              connect.static("test")
              connect().use("/bower_components", connect.static("./bower_components"))
              connect.static(appConfig.app)
            ]

      dist:
        options:
          open: true
          base: "<%= yeoman.dist %>"
=======
          options:
            port: 9000
            open: true
            livereload: 35729
            
            # Change this to '0.0.0.0' to access the server from outside
            hostname: "localhost"
    
          livereload:
            options:
              middleware: (connect) ->
                [
                  connect.static(".tmp")
                  connect().use("/bower_components", connect.static("./bower_components"))
                  connect.static(config.app)
                ]
    
          test:
            options:
              open: false
              port: 9001
              middleware: (connect) ->
                [
                  connect.static(".tmp")
                  connect.static("test")
                  connect().use("/bower_components", connect.static("./bower_components"))
                  connect.static(config.app)
                ]
    
          dist:
            options:
              base: "<%= config.dist %>"
              livereload: false

    
    # Empties folders to start fresh
    clean:
      dist:
        files: [
          dot: true
          src: [
            ".tmp"
            "<%= config.dist %>/*"
            "!<%= config.dist %>/.git*"
          ]
        ]

      server: ".tmp"
>>>>>>> bare

    
    # Make sure code styles are up to par and there are no obvious mistakes
    jshint:
      options:
        jshintrc: ".jshintrc"
        reporter: require("jshint-stylish")

<<<<<<< HEAD
      all:
        src: [
          "Gruntfile.js"
          "<%= yeoman.app %>/scripts/{,*/}*.js"
        ]

      test:
        options:
          jshintrc: "test/.jshintrc"

        src: ["test/spec/{,*/}*.js"]

    
    # Empties folders to start fresh
    clean:
      dist:
        files: [
          dot: true
          src: [
            ".tmp"
            "<%= yeoman.dist %>/{,*/}*"
            "!<%= yeoman.dist %>/.git*"
          ]
        ]

      server: ".tmp"
=======
      all: [
        "<%= config.app %>/scripts/{,*/}*.js"
        "!<%= config.app %>/scripts/vendor/*"
        "test/spec/{,*/}*.js"
      ]

    
    # Mocha testing framework configuration options
    mocha:
      all:
        options:
          run: true
          urls: ["http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html"]

    # Compiles LESS into CSS
    less:
      dist:
        options: 
          paths: [ "<%= config.app %>/styles" ]
        files: [
          expand: true
          cwd: "<%= config.app %>/styles"
          src: "*.less"
          dest: "<%= config.app %>/styles"
          ext: ".css"
        ]    
        
    # Compiles CoffeeScript to JavaScript
    coffee:
      dist:
        files: [
          expand: true
          cwd: "<%= config.app %>/scripts"
          src: "{,*/}*.{coffee,litcoffee,coffee.md}"
          dest: ".tmp/scripts"
          ext: ".js"
        ]

      test:
        files: [
          expand: true
          cwd: "test/spec"
          src: "{,*/}*.{coffee,litcoffee,coffee.md}"
          dest: ".tmp/spec"
          ext: ".js"
        ]
>>>>>>> bare

    
    # Add vendor prefixed styles
    autoprefixer:
      options:
<<<<<<< HEAD
        browsers: ["last 2 versions"]
=======
        browsers: [
          "> 1%"
          "last 2 versions"
          "Firefox ESR"
          "Opera 12.1"
        ]
>>>>>>> bare

      dist:
        files: [
          expand: true
<<<<<<< HEAD
          cwd: ".tmp/styles/"
          src: "{,*/}*.css"
          dest: ".tmp/styles/"
        ]

    
    # Automatically inject Bower components into the app
    wiredep:
      app:
        src: ["<%= yeoman.app %>/index.html"]
        ignorePath: /\.\.\//

    
    # Renames files for browser caching purposes
    filerev:
      dist:
        src: [
          "<%= yeoman.dist %>/scripts/{,*/}*.js"
          "<%= yeoman.dist %>/styles/{,*/}*.css"
          "<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
          "<%= yeoman.dist %>/styles/fonts/*"
        ]

=======
          cwd: "<%= config.app %>/styles/"
          src: "{,*/}*.css"
          dest: "<%= config.dist %>/styles/"
        ]

    
    # Automatically inject Bower components into the HTML file
    wiredep:
      app:
        ignorePath: /^\/|\.\.\//
        src: ["<%= config.app %>/index.html"]
    
    # Renames files for browser caching purposes
    rev:
      dist:
        files:
          src: [
            "<%= config.dist %>/scripts/{,*/}*.js"
            "<%= config.dist %>/styles/{,*/}*.css"
            "!<%= config.dist %>/styles/concierge-icons-*.css"
            "!<%= config.dist %>/images/logo.*"
            "<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
            "<%= config.dist %>/styles/fonts/{,*/}*.*"
            "<%= config.dist %>/*.{ico,png}"
          ]

    
>>>>>>> bare
    # Reads HTML for usemin blocks to enable smart builds that automatically
    # concat, minify and revision files. Creates configurations in memory so
    # additional tasks can operate on them
    useminPrepare:
<<<<<<< HEAD
      html: "<%= yeoman.app %>/index.html"
      options:
        dest: "<%= yeoman.dist %>"
        flow:
          html:
            steps:
              js: [
                "concat"
                "uglifyjs"
              ]
              css: ["cssmin"]

            post: {}

    
    # Performs rewrites based on filerev and the useminPrepare configuration
    usemin:
      html: ["<%= yeoman.dist %>/{,*/}*.html"]
      css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]
      options:
        assetsDirs: [
          "<%= yeoman.dist %>"
          "<%= yeoman.dist %>/images"
        ]

    
    # The following *-min tasks will produce minified files in the dist folder
    # By default, your `index.html`'s <!-- Usemin block --> will take care of
    # minification. These next options are pre-configured if you do not wish
    # to use the Usemin blocks.
    
    cssmin:
      dist: files: '<%= yeoman.dist %>/styles/main.css': [ '.tmp/styles/{,*/}*.css' ]

    uglify: 
      options: mangle: false
      dist: files: '<%= yeoman.dist %>/scripts/scripts.js': [ '<%= yeoman.dist %>/scripts/scripts.js' ]

    # imagemin:
    #   dist:
    #     options: 
    #       cache: false
    #     files: [
    #         expand: true
    #         cwd: "<%= yeoman.app %>/images"
    #         src: "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,svg}"
    #         dest: "<%= yeoman.dist %>/images"
    #       ]
    
    # svgmin:
    #   dist:
    #     files: [
    #          expand: true
    #          cwd: "<%= yeoman.app %>/images"
    #          src: "{,*/}*.svg"
    #          dest: "<%= yeoman.dist %>/images"
    #        ]
 
    htmlmin:
      dist:
        options:
          collapseWhitespace: true
          conservativeCollapse: true
          collapseBooleanAttributes: true
          removeCommentsFromCDATA: true
          removeOptionalTags: true

        files: [
          expand: true
          cwd: "<%= yeoman.dist %>"
          src: [
            "*.html"
            "views/{,*/}*.html"
          ]
          dest: "<%= yeoman.dist %>"
        ]

    
    # ng-annotate tries to make the code safe for minification automatically
    # by using the Angular long form for dependency injection.
    ngAnnotate:
      dist:
        files: [
          expand: true
          cwd: ".tmp/concat/scripts"
          src: [
            "*.js"
            "!oldieshim.js"
          ]
          dest: ".tmp/concat/scripts"
        ]

    
    # Replace Google CDN references
    cdnify:
      dist:
        html: ["<%= yeoman.dist %>/*.html"]

    
    # Copies remaining files to places other tasks can use
    copy:
      dist:
=======
      options:
        dest: "<%= config.dist %>"

      html: "<%= config.app %>/index.html"
      flow:
        html:
          steps:
            js: [
              "concat"
              "uglifyjs"
            ]
            css: ["cssmin"]

          post: {}

    
    # Performs rewrites based on rev and the useminPrepare configuration
    usemin:
      options:
        assetsDirs: [
          "<%= config.dist %>"
          "<%= config.dist %>/images"
          "<%= config.dist %>/styles"
        ]

      html: ["<%= config.dist %>/{,*/}*.html"]
      css: ["<%= config.dist %>/styles/{,*/}*.css"]

    
    # The following *-min tasks produce minified files in the dist folder
    imagemin:
      dist:
        files: [
          expand: true
          cwd: "<%= config.app %>/images"
          src: "{,*/}*.{gif,jpeg,jpg,png}"
          dest: "<%= config.dist %>/images"
        ]

    svgmin:
      dist:
        files: [
          expand: true
          cwd: "<%= config.app %>/sources/svg/*.svg"
          src: "{,*/}*.svg" 
        ]

    htmlmin:
      dist:
        options:
          collapseBooleanAttributes: true
          collapseWhitespace: true
          conservativeCollapse: true
          removeAttributeQuotes: true
          removeCommentsFromCDATA: true
          removeEmptyAttributes: true
          removeOptionalTags: true
          removeRedundantAttributes: true
          useShortDoctype: true
        files: [
          expand: true
          cwd: "<%= config.dist %>"
          src: "{,*/}*.html"
          dest: "<%= config.dist %>"
        ]
        
    # Compiles svg into sprite sheets
    grunticon:
      dist:
        files: [
          expand: true
          cwd:  "<%= config.app %>/sources/svg"
          src:  ["*.svg"]
          dest: "<%= config.app %>/styles"
        ]
        options: 
          colors: white: "#FFFFFF", red: "#FFFF00", black: "#00000"
          datasvgcss: "concierge-icons-data-svg.css"
          datapngcss: "concierge-icons-data-png.css"
          urlpngcss: "concierge-icons-fallback.css"
          previewhtml: "concierge-icons-preview.html"
          loadersnippet: "concierge-icons-loader.js"
          cssprefix: ".concierge-icon-"
        
    # By default, your `index.html`'s <!-- Usemin block --> will take care
    # of minification. These next options are pre-configured if you do not
    # wish to use the Usemin blocks.
    # cssmin: {
    #   dist: {
    #     files: {
    #       '<%= config.dist %>/styles/main.css': [
    #         '.tmp/styles/{,*/}*.css',
    #         '<%= config.app %>/styles/{,*/}*.css'
    #       ]
    #     }
    #   }
    # },
    # uglify: {
    #   dist: {
    #     files: {
    #       '<%= config.dist %>/scripts/scripts.js': [
    #         '<%= config.dist %>/scripts/scripts.js'
    #       ]
    #     }
    #   }
    # },
    # concat: {
    #   dist: {}
    # },
    
    # Copies remaining files to places other tasks can use
    copy:
      dist: 
>>>>>>> bare
        files: [
          {
            expand: true
            dot: true
<<<<<<< HEAD
            cwd: "<%= yeoman.app %>"
            dest: "<%= yeoman.dist %>"
            src: [
              "*.{ico,png,txt}"
              ".htaccess"
              "*.html"
              "views/{,*/}*.html"
              "images/{,*/}*.{webp,png,jpg,jpeg,gif,svg}"
              "styles/{,*/}*.css"
              "scripts/{,*/}*.js"
              "fonts/*"
              "CNAME"
            ]
          }
          {
            expand: true
            cwd: ".tmp/images"
            dest: "<%= yeoman.dist %>/images"
            src: ["generated/*"]
          }
          {
            expand: true
            cwd: "bower_components/bootstrap/dist"
            src: "fonts/*"
            dest: "<%= yeoman.dist %>"
          }
        ]

      styles:
        expand: true
        cwd: "<%= yeoman.app %>/styles"
        dest: ".tmp/styles/"
        src: "{,*/}*.css"

    # Run some tasks in parallel to speed up the build process
    concurrent:
      server: ["copy:styles"]
      test: ["copy:styles"]
      dist: [
        "copy:styles"
        # "imagemin"
        # "svgmin"
      ]

    # Test settings
    # karma:
    #   unit:
    #     configFile: "test/karma.conf.js"
    #     singleRun: true

  grunt.registerTask "jsonloader", "Expose JSON data to JS without needing ajax calls", ->
    i18n   = fs.readFileSync './app/scripts/data/i18n.json', 'utf8'
    concierge   = fs.readFileSync './app/scripts/data/concierge.json', 'utf8'
    source = "/* jshint ignore:start */(function(exports){'use strict';exports.GABJSON={ concierge: #{concierge}, i18n: #{i18n} };})(window);/* jshint ignore:end */"
    fs.writeFileSync './app/scripts/data.js', source
    
  grunt.registerTask "serve", "Compile then start a connect web server", (target) ->
=======
            cwd: "<%= config.app %>"
            dest: "<%= config.dist %>"
            src: [ "*.{ico,png,txt}", "images/{,*/}*.*", "{,*/}*.html", "styles/fonts/{,*/}*.*" ]
          }
          ]
      styles:
        expand: true
        dot: true
        cwd: "<%= config.app %>/styles"
        dest: ".tmp/styles/"
        src: "{,*/}*.css"
    # Generates a custom Modernizr build that includes only the tests you
    # reference in your app
    modernizr:
      dist:
        devFile: "bower_components/modernizr/modernizr.js"
        outputFile: "<%= config.dist %>/scripts/modernizr.js"
        files:
          src: [
            "<%= config.dist %>/scripts/{,*/}*.js"
            "<%= config.dist %>/styles/{,*/}*.css"
            "!<%= config.dist %>/scripts/vendor/*"
          ]
        uglify: true
      

    
    # Run some tasks in parallel to speed up build process
    concurrent:
      server: [
        "less:dist"        
        "coffee:dist"
        "copy:styles"
      ]
      test: [
        "less"
        "coffee"
        "copy"
      ]
      dist: [
        "less"
        "coffee"
        # "imagemin"
        "svgmin"
        "grunticon"
        "copy"
      ]
      


  grunt.registerTask "serve", "start the server and preview your app, --allow-remote for remote access", (target) ->
    grunt.config.set "connect.options.hostname", "0.0.0.0"  if grunt.option("allow-remote")
>>>>>>> bare
    if target is "dist"
      return grunt.task.run([
        "build"
        "connect:dist:keepalive"
      ])
    grunt.task.run [
      "clean:server"
<<<<<<< HEAD
      "jsonloader"
=======
>>>>>>> bare
      "wiredep"
      "concurrent:server"
      "autoprefixer"
      "connect:livereload"
      "watch"
    ]
    return

<<<<<<< HEAD
  grunt.registerTask "server", "DEPRECATED TASK. Use the \"serve\" task instead", (target) ->
    grunt.log.warn "The `server` task has been deprecated. Use `grunt serve` to start a server."
    grunt.task.run ["serve:" + target]
    return

  grunt.registerTask "test", [
    "clean:server"
    "concurrent:test"
    "autoprefixer"
    "connect:test"
    # "karma"
  ]
  grunt.registerTask "build", [
    "clean:dist"
    "coffee"
    "less"
    "jsonloader"
    "wiredep"
    "useminPrepare"
    "concurrent:dist"
    # "autoprefixer"
    "concat"
    # "ngAnnotate"
    "copy:dist"
    "cdnify"
    'cssmin'
    'uglify'
    "filerev"
    "usemin"
    "htmlmin"
  ]
  grunt.registerTask "default", [
    "coffee"
    "less"
    "newer:jshint"
    "test"
    "build"
  ]
  
  # Load grunt tasks automatically
  require("load-grunt-tasks") grunt
  
=======
  grunt.registerTask "server", (target) ->
    grunt.log.warn "The `server` task has been deprecated. Use `grunt serve` to start a server."
    grunt.task.run [(if target then ("serve:" + target) else "serve")]
    return
    
  grunt.registerMultiTask 'gab_json_i18n', 'Fuckit, this so simple with JSON.parse reviver.', ->
    template = JSON.stringify grunt.file.readJSON this.data.template
    task = this
    allowed_keys = ['title','description','label']
    translated = ['en_CA','fr_CA'].reduce ( obj, loc )->
      localeData = grunt.file.readJSON "#{task.data.locales}/#{loc}.json"
      short  = loc.replace /_.+$/,''
      parsed = JSON.parse template, ( k, v )->
        return v unless k in allowed_keys
        return localeData[k]||v
      obj[loc] = parsed
      obj[short] = parsed
      return obj
    , {}
    grunt.file.write this.data.output, "!(function(w){'use strict';w.#{config.appname}=#{JSON.stringify( translated )}})(this);" , encoding: 'utf8'


  grunt.registerTask "test", (target) ->
    if target isnt "watch"
      grunt.task.run [
        "clean:server"
        "concurrent:test"
        "autoprefixer"
      ]
    grunt.task.run [
      "connect:test"
      "mocha"
    ]
    return

  grunt.registerTask "build", [
    "clean:dist"
    "merge_data"
    "gab_json_i18n"
    "grunticon"
    "less"
    "wiredep"
    "useminPrepare"
    "concurrent:dist"
    "autoprefixer"
    "concat"
    "cssmin"
    "uglify"
    "modernizr"
    "rev"
    "usemin"
    "htmlmin"
    "svgmin"
  ]
  grunt.registerTask "default", [
    # "newer:jshint"
    "test"
    "build"
  ]
>>>>>>> bare
  return