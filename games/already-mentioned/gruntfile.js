module.exports = function(grunt) {
    'use strict';

    var lessSources = [
        'less/main.less'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: [
                    '**/*.less'
                ],
                tasks: ['less']
            },  
            all: {
                files: 'Gruntfile.js',
                tasks: ['build']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'index.html', 'dist/*'
                ]
            }
        },
        less: {
            development: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']})
                    ]
                },
                files: {
                    'dist/bundle.css': lessSources
                }
            },
            production: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))()
                    ]
                },
                files: {
                    'dist/bundle.min.css': lessSources
                }
            }
        },
        connect: {
            server: {
                options: {
                    open: true
                }
            }
        },
        shell: {
            bower: {
                command: 'bower update'
            }
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');

    // Register the default tasks.
    grunt.registerTask('build', ['shell:bower', 'less']);
    grunt.registerTask('default', ['build', 'connect:server', 'watch']);
};