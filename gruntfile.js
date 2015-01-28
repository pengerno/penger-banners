module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			tmp: {
				options: {
					style: 'compressed',
					noCache: true
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.scss'],
					dest: '.tmp',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			tmp: {
				expand: true,
				cwd: '.tmp',
				src: '**/*.css',
				dest: '.tmp'
			}
		},

		inline_style: {
			tmp: {
				expand: true,
				cwd: '.tmp',
				src: ['**/*.html'],
				dest: '.tmp'
			}
		},

		htmlmin: {
			tmp: {
				options: {
					minifyCSS: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					cwd: '.tmp',
					src: '**/*.html',
					dest: '.tmp'
				}]
			}
		},

		imagemin: {
			tmp: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: ['**/*.{jpg,png,gif}'],
					dest: '.tmp'
				}]
			}
		},

		sync: {
			tmp: {
				files: [{
					cwd: 'src',
					src: ['**/*.{html,png,jpg,jpeg,gif}'],
					dest: '.tmp'
				}]
			},
			build: {
				files: [{
					cwd: '.tmp',
					src: ['**/*.{html,png,jpg,jpeg,gif}'],
					dest: 'build'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-inline-styles');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('default', [
		'sync:tmp',
		'sass',
		'autoprefixer',
		'inline_style',
		'htmlmin',
		'imagemin',
		'sync:build'
	]);

}