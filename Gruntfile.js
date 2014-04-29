/*
 * Generated on 2014-04-26
 * generator-assemble v0.4.3
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist',
      bower_dir:'bower_components'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates,assets}/{,*/}*.{md,hbs,yml,less,js}'],
        tasks: ['assemble', 'css-process', 'js-compile']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    // Js related tasks
    jshint: {
      options: {
        jshintrc: '<%= config.src %>/assets/js/.jshintrc'
      },
      src: {
        src: '<%= config.src %>/assets/js/*.js'
      }
    },

    concat: {
      options: {
      },
      dist: {
        src: ['<%= config.src %>/assets/js/twitter-post-fetcher.js'],
        dest: '<%= config.dist %>/assets/js/main.js'
      }
    },

    uglify: {
      dist: {
        options: {
          // banner: '<%= banner %>'
        },
        src: '<%= concat.dist.dest %>',
        dest: '<%= config.dist %>/assets/js/main.min.js'
      },
    },

    // Less and CSS related tasks

    less : {
      dist: {
        cleancss: true,
        expand: true,
        cwd: '<%= config.src %>/assets/less/',
        src: [
            'main.less'
        ],
        dest: '<%= config.dist %>/assets/css/',
        ext: ".css"
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dist: {
        options: {
          map: true
        },
        src: '<%= config.dist %>/assets/css/main.css'
      }
    },
    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: '<%= config.dist %>/assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= config.dist %>/assets/css/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml,css}']

  });

  grunt.loadNpmTasks('assemble');
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'css-process',
    'js-compile',
    'connect:livereload',
    'watch'
  ]);
 
  grunt.registerTask('js-compile', ['concat:dist','uglify:dist']); //TODO: add jshint:src

  grunt.registerTask('less-compile', ['less:dist']);
 
  grunt.registerTask('css-process', ['less-compile', 'autoprefixer', 'csscomb']);

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'css-process',
    'js-compile'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
