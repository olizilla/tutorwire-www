/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		// Creat the html files from page layouts and partial html fragments
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

		// Copy front end js libs to the dest dir.
		bower: {
			dev: {
				dest: '_dist/assets/js/vendor/'
			}
		},

		copy:{
			main:{
				files:[{
						expand:true,
						src: ['{js,css}/**/*'],
						dest: '_dist/assets',
						ext: ''
					}]
				}
		},

		watch:{
			files: ['html/*', 'html/**/*', 'css/*', 'js/*', 'Gruntfile.js'],
			tasks:['default']
		}

	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['assemble', 'copy', 'bower']);
};