/* eslint-disable */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            options: {
               transform: [
                   ['babelify', {presets: ['env']}],
                   "uglifyify"
               ]
            },
            build: {
                src: 'src/**/*.js',
                dest: 'dist/dist.js'
            }
        },
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['browserify']);
};
