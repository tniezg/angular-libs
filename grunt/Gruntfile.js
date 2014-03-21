module.exports = function(grunt) {
	var sourcePath = '../scripts',
		buildPath = '../build';

	grunt.initConfig({
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
				src: [sourcePath + '/module.js', sourcePath +
					'/actionPopup/actionPopup.js'
				],
				dest: buildPath + '/module.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('build', [
		'concat:build'
	]);
};