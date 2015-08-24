'use strict';

module.exports = function(grunt) {

    // Jit compiler for grunt
    require('jit-grunt')(grunt);


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * $PROJECT-VARIABLES
         */
        project: {

            /**
             * $PATHS
             */
            'prototypePath': 'middleman',
            'prototypeSourcePath': '<%= project.prototypePath %>/source',
            'prototypeBuildPath': '<%= project.prototypePath %>/build',
            'prototypeCssPath': '<%= project.prototypePath %>/source/stylesheets',
            'prototypeSassPath': '<%= project.prototypePath %>/source/sass',
            'prototypeJsPath': '<%= project.prototypePath %>/source/javascripts'
        },


        /**
         * $WATCH
         */
        watch: {
            app: {
                files: ['<%= project.prototypeSassPath %>/*.scss'],
                tasks: ['sass:dev']
            }
        },

        /**
         * Sass
         */
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= project.prototypeCssPath %>/foundation.css':'<%= project.prototypeSassPath %>/foundation.scss',
                    '<%= project.prototypeCssPath %>/normalize.css':'<%= project.prototypeSassPath %>/normalize.scss',
                    '<%= project.prototypeCssPath %>/app.css':'<%= project.prototypeSassPath %>/app.scss'
                }
            },
            production: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= project.prototypeCssPath %>/foundation.css':'<%= project.prototypeSassPath %>/foundation.scss',
                    '<%= project.prototypeCssPath %>/normalize.css':'<%= project.prototypeSassPath %>/normalize.scss',
                    '<%= project.prototypeCssPath %>/app.css':'<%= project.prototypeSassPath %>/app.scss'
                }
            }
        },



        /**
         * $MIDDLEMAN
         */
        middleman: {
            options: {
                useBundle: false,
                cwd: "<%= project.prototypePath %>"
            },
            server: {},
            build: {
                options: {
                    verbose: true,
                    command: "build"
                }
            }
        }

    });



    // enable Middleman
    grunt.loadNpmTasks('grunt-middleman');




    /**
     * Starts the middleman server.
     */
    grunt.registerTask('app-serve', [
        'middleman:server'
    ]);


    /**
     * Watch app
     */
    grunt.registerTask('app-watch', [
        'sass:dev',
        'watch:app'
    ]);


    // Default task(s).
    grunt.registerTask('default', 'default task', function() {
        grunt.log.writeln('');
        grunt.log.writeln('USAGE');
        grunt.log.writeln('-----');
        grunt.log.writeln('To watch (mainly for scss changes):');
        grunt.log.writeln('grunt app-watch');
        grunt.log.writeln('');
        grunt.log.writeln('To start the middleman server:');
        grunt.log.writeln('grunt app-serve');
        grunt.log.writeln('');
        grunt.log.writeln('To create the build:');
        grunt.log.writeln('grunt app-build');
    });


    /**
     * Builds the prototype and creates static files in `build` folder.
     */
    grunt.registerTask('app-build', [
        'sass:production',
        'middleman:build'
    ]);


};