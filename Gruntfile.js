/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		// Creat the html files from page layouts and partial html fragments
		assemble:{
			options: {
				assets: 'dist/',
				layout:'html/layout.h5bp.hbs',
				partials: 'html/partials/*.hbs'
			},
			pages: {
				files:[{
					expand:true,
					cwd: 'html/pages/',
					src: ['**/*.hbs'],
					dest: '_dist',
					ext: '.html'
				}]
			}
		},

		// Copy front end js libs to the dest dir.
		bower: {
			dev: {
				dest: '_dist/js/vendor/'
			}
		}
	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-bower');

	grunt.registerTask('default', ['assemble', 'bower']);
};