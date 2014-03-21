module.exports = function(grunt) {
	var sourcePath = '../app',
		buildPath = '../build',
		scriptsPath = '../scripts',
		cssPath = sourcePath + '/css',
		destinationCssPath = cssPath + '/layout.css';

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
					'!**/*.css',
					'!' + sourcePath + '/bower_components/**/*',
				],
				tasks: [
					'less:development',
					'concat:build'
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
				dest: buildPath + '/module.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', [
		'concat:build'
	]);

	grunt.registerTask('dev-watch', [
		'watch:development'
	]);
};