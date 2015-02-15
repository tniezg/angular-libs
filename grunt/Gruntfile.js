module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		example: {
			app: '../examples',
		},
		library: {
			templates: '../template',
			scripts: '../scripts',
			build: '../build',
			styles: '../styles'
		},



		compass: {
			build: {
				options: {
					sassDir: '<%= library.styles %>',
					cssDir: '<%= library.styles %>'
				}
			},
			example: {
				options: {
					sassDir: '<%= example.app %>/styles',
					cssDir: '<%= example.app %>/styles'
				}
			}
		},
		autoprefixer: {
			build: {
				expand: true,
				src: '<%= library.styles %>/*.css'
			},
			example: {
				expand: true,
				src: '<%= example.app %>/styles/*.css'
			}
		},
		watch: {
			options: {
				atBegin: true,
				interrupt: true,
				livereload: 35728
			},
			refreshOnly: {
				files: [
					'<%= example.app %>/index.html',
					'<%= example.app %>/views/**/*.html'
				],
				tasks: []
			},
			buildLibrary: {
				files: [
					'<%= library.scripts %>/**/*.js'
				],
				tasks: [
					'uglify:build',
					'uglify:buildWithTemplates'
				]
			},
			buildTemplates: {
				files: [
					'<%= library.templates %>/**/*'
				],
				tasks: [
					'html2js:templates',
					'uglify:buildWithTemplates'
				]
			},
			buildLibraryStyle: {
				files: [
					'<%= library.styles %>/**/*.{scss,sass}'
				],
				tasks: [
					'compass:build',
					'autoprefixer:build'
				]
			},
			buildExampleStyle: {
				files: [
					'<%= example.app %>/styles/**/*.{scss,sass}'
				],
				tasks: [
					'compass:example',
					'autoprefixer:example'
				]
			},
			injectBowerScripts: {
				files: [
					'<%= example.app %>/bower_components/**/*.js'
				],
				tasks: [
					'wiredep:example'
				]
			},
			injectExampleScripts: {
				files: [
					'<%= example.app %>/scripts/**/*.js',
					'<%= example.build =>/tn-extensions-full.js'
				],
				tasks: [
					'injector:example'
				]
			}
		},
		html2js: {
			templates: {
				options: {
					//rename: function(moduleName) {
					//	return 'tn/' + moduleName;
					//},
					base: '../',
					module: 'tn.extensions.templates'
				},
				src: [
					'<%= library.templates %>/**/*.html'
				],
				dest: '<%= library.build %>/tn-extensions-templates-only.js'
			},
		},
		wiredep: {
			example: {
				src: [
					'<%= example.app %>/index.html'
				],
				cwd: '<%= example.app %>'
			}
		},
		injector: {
			options: {
				relative: true,
				addRootSlash: false
			},
			example: {
				files: {
					'<%= example.app %>/index.html': [
						'<%= library.build %>/tn-extensions-full.js',
						'<%= example.app %>/scripts/modules/**/*.js',
						'<%= example.app %>/scripts/controllers/**/*.js',
						'<%= example.app %>/scripts/services/**/*.js'
					]
				}
			}
		},


		bump: {
			options: {
				files: ['../bower.json'],
				commitFiles: ['-a'],
				push: false
			}
		},
		uglify: {
			options: {
				sourceMap: true
			},
			build: {
				src: [
					'<%= library.scripts %>/directives/**/*.js',
					'<%= library.scripts %>/services/**/*.js',
					'<%= library.scripts %>/module.js'
				],
				dest: '<%= library.build %>/tn-extensions-no-templates.js'
			},
			// all paths provided for source map to work
			buildWithTemplates: {
				src: [
					'<%= library.scripts %>/directives/**/*.js',
					'<%= library.scripts %>/services/**/*.js',
					'<%= library.build %>/tn-extensions-templates-only.js',
					'<%= library.scripts %>/module.js'
				],
				dest: '<%= library.build %>/tn-extensions-full.js'
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	//grunt.registerTask('build', [
	//	'uglify:build',
	//]);

	grunt.registerTask('default', [
		'watch'
	]);
};