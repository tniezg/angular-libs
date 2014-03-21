module.exports = function(grunt) {
	var sourcePath = '../app',
		buildPath = '../build',
		scriptsPath = '../scripts',
		cssPath = sourcePath + '/css',
		destinationCssPath = cssPath + '/layout.css',
		templatesPath = '../template';

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
					'!**/*.css',
					'!' + sourcePath + '/bower_components/**/*',
				],
				tasks: [
					'less:development',
					'html2js:build',
					'concat:build',
					'concat:buildWithTemplates'
				],
				options: {
					nospawn: true,
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
				// commit: false
			}
		},
		concat: {
			// separator:';'
			build: {
				src: [
					scriptsPath + '/module.js',
					scriptsPath + '/actionPopup/actionPopup.js'
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
		}
	});

	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html2js');

	grunt.registerTask('build', [
		'concat:build'
	]);

	grunt.registerTask('dev-watch', [
		'watch:development'
	]);
};