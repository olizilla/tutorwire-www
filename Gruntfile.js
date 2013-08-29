/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		// Create the html files from page layouts and partial html fragments
		assemble:{
			options: {
				assets: '_dist/assets',
				layout:'html/layout.h5bp.hbs',
				partials: 'html/partials/*.hbs',
				data: 'html/data/*.json'
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

		browserify: {
			dist: {
				files: {
					'_dist/assets/js/bundle.js': 'js/main.js'
				}
			}
		},

		copy:{
			main:{
				files:[{
						expand:true,
						src: ['css/**/*', 'js/vendor/**/*'],
						dest: '_dist/assets'
					}]
				}
		},

		watch: {
			options: {atBegin: true},
			files: ['html/*', 'html/**/*', 'css/*', 'js/*', 'Gruntfile.js'],
			tasks: ['default']
		}

	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['assemble', 'copy', 'browserify']);
};