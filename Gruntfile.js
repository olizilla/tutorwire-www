/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Create the html files from page layouts and partial html fragments
		assemble:{
			options: {
				pkg: '<%= pkg %>',
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

		copy:{
			main:{
				files:[
					{expand:true, src: ['css/**/*', 'js/vendor/**/*', 'img/**'], dest: '_dist/assets'},
					{expand:true, cwd: 'img', src: 'favicon.ico', dest: '_dist/'}
				]
			}
		},

		browserify: {
			dist: {
				options: {transform: ['brfs', 'uglifyify']},
				files: {'_dist/assets/js/bundle.js': 'js/main.js'}
			},
			watch: {
				options: {transform: ['brfs']},
				files: {'_dist/assets/js/bundle-<%=pkg.version%>.js': 'js/main.js'}
			}
		},

		watch: {
			options: {atBegin: true},
			files: ['html/*', 'html/**/*', 'css/*', 'js/*', 'img/**', 'Gruntfile.js'],
			tasks: ['assemble', 'copy', 'browserify:watch']
		},
		
		clean: {
			dist: '_dist/*'
		}

	});

	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['assemble', 'copy', 'browserify:dist']);
};