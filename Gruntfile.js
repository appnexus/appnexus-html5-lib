'use strict'

module.exports = function (grunt) {

  // Project dependency tasks
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['build/*'],
    },
    browserify: {
      build: {
        browserifyOptions: {
          debug: true,
          noParse: true
        },
        src: ['src/index.js'],
        dest: 'build/appnexus-html5-lib.js'
      }
    },
    uglify: {
      options: {
        banner: '/*\n * <%= pkg.description %>\n * Author: <%= pkg.author.name %> (<%= pkg.author.email %>) \n * Website: <%= pkg.author.url %>\n * <%= pkg.license %> Licensed.\n *\n * <%= pkg.name %> <%= pkg.version %>\n */\n '
      },
      build: {
        src: 'build/appnexus-html5-lib.js',
        dest: 'build/appnexus-html5-lib.min.js'
      }
    },
    watch: {
      test: {
        files: 'src/**/*.js',
        tasks: ['browserify']
      }
    }
  });

  //grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);
  grunt.registerTask('default', ['clean', 'browserify', 'watch']);
  grunt.registerTask('build', ['clean', 'browserify', 'uglify']);
};