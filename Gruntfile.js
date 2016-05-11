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
      dist: ['dist/*'],
    },
    browserify: {
      client: {
        browserifyOptions: {
          debug: true,
          noParse: true
        },
        src: ['src/client.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      client: {
        options: {
          banner: '/*\n * <%= pkg.description %> for Client\n * Author: <%= pkg.author.name %> (<%= pkg.author.email %>) \n * Website: <%= pkg.author.url %>\n * <%= pkg.license %> Licensed.\n *\n * <%= pkg.name %>.min.js <%= pkg.version %>\n */\n '
        },
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
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