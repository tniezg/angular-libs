var path = require('path');

module.exports = function(grunt) {
	var sourcePath = '../app';
	var buildPath = '../build';
	var scriptsPath = '../scripts';
	var cssPath = sourcePath + '/css';
	var destinationCssPath = cssPath + '/layout.css';
	var templatesPath = '../template';
	var directivesPath = scriptsPath + '/directives';
	var servicesPath = scriptsPath + '/services';
	var sourceIndex = sourcePath + '/index.html';
	var injectorFiles = {};

	injectorFiles[sourceIndex] = [
		directivesPath + '/**/*.js',
		servicesPath + '/**/*.js'
	];

	grunt.initConfig({
		less: {
			development: {
				src: [
					cssPath + '/layout.less'
				],
				dest: destinationCssPath,
				options: {
					compress: true
				}
			}
		},
		watch: {
			development: {
				files: [
					sourcePath + '/**/*',
					scriptsPath + '/**/*',
					templatesPath + '/**/*',
					'!' + sourcePath + '/bower_components/**/*',
					'!' + sourcePath + '/**/*.css'
				],
				tasks: [
					'less:development',
					'html2js:build',
					'concat:build',
					'concat:buildWithTemplates'
				],
				options: {
					interrupt: true,
					livereload: true
				}
			}
		},
		bump: {
			options: {
				files: ["../bower.json"],
				commitFiles: ["-a"],
				push: false
			}
		},
		concat: {
			// separator:';'
			build: {
				src: [
					scriptsPath + '/directives/*.js',
					scriptsPath + '/services/*.js'
				],
				dest: buildPath + '/tn-extensions.js'
			},
			buildWithTemplates: {
				src: [
					buildPath + '/tn-extensions.js',
					buildPath + '/tn-extensions-templates-only.js'
				],
				dest: buildPath + '/tn-extensions-templates.js'
			}
		},
		html2js: {
			options: {
				base: '../',
				module: 'tn.extensions.templates'
			},
			build: {
				src: [templatesPath + '/**/*.html'],
				dest: buildPath + '/tn-extensions-templates-only.js'
			},
		},
		wiredep: {
			dev: {
				src: [
					sourceIndex
				],
				cwd: sourcePath
			}
		},
		injector: { //provides correct file paths but for bad reasons
			options: {
				addRootSlash: false,
			},
			dev: {
				files: injectorFiles
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('build', [
		'concat:build'
	]);

	grunt.registerTask('dev-watch', [
		'watch:development'
	]);
};