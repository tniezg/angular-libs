module.exports = function(grunt) {
	'use strict';

	// var sourcePath = '../examples';
	// var buildPath = '../build';
	// var scriptsPath = '../scripts';
	// var cssPath = sourcePath + '/css';
	// var destinationCssPath = cssPath + '/layout.css';
	// var templatesPath = '../template';
	// var servicesPath = scriptsPath + '/services';
	// var sourceIndex = sourcePath + '/index.html';

	grunt.initConfig({
		example: {
			app: '../examples',
		},
		library: {
			templates: '../template',
			scripts: '../scripts',
			build: '../build'
		},



		less: {
			example: {
				src: [
					'<%= example.app %>/css/layout.less'
				],
				dest: '<%= example.app %>/css/layout.css',
				options: {
					compress: true
				}
			}
		},
		watch: {
			options: {
				atBegin: true,
				interrupt: true,
				livereload: true
			},
			refreshOnly: {
				files: [
					'<%= example.app %>/index.html'
				],
				tasks: []
			},
			buildLibrary: {

			},
			buildTemplates: {
				files: [
					'<%= library.templates %>/**/*',
				],
				tasks: [
					'html2js:templates',
					'uglify:build',
					'uglify:buildWithTemplates'
				]
			},
			buildExampleStyle: {
				files: [
					'<%= example.app %>/**/*.less'
				],
				tasks: [
					'less:example'
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
					'<%= library.scripts %>/module.js',
					'<%= library.scripts %>/directives/*.js',
					'<%= library.scripts %>/services/*.js'
				],
				dest: '<%= library.build %>/tn-extensions-no-templates.js'
			},
			// all paths provided for source map to work
			buildWithTemplates: {
				src: [
					'<%= library.scripts %>/module.js',
					'<%= library.scripts %>/directives/*.js',
					'<%= library.scripts %>/services/*.js',
					'<%= library.build %>/tn-extensions-templates-only.js'
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