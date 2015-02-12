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
			},
			dev: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.scss'],
					dest: 'src',
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
			},
			dev: {
				expand: true,
				cwd: 'src',
				src: '**/*.css',
				dest: 'src'
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
					minifyJS: true,
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
					// dest: '.tmp'
					dest: 'build'
				}]
			}
		},

		imageEmbed: {
			tmp: {
				files: [{
					expand: true,
					cwd: '.tmp',
					src: ['**/*.css'],
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
					src: ['**/*.html'],
					dest: 'build'
				}]
			}
		},

		clean: {
			tmp: {
				src: ['.tmp']
			}
		},

		watch: {
			style: {
				files: 'src/**/*.scss',
				tasks: ['sass:dev', 'autoprefixer:dev']
			}
		},

		browserSync: {
			bsFiles: {
				src: [
					'src/**/*.html',
					'src/**/*.css'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: 'src/'
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-inline-styles');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-image-embed');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', [
		'sync:tmp',
		'sass:tmp',
		'imagemin',
		// 'imageEmbed',
		'autoprefixer:tmp',
		'inline_style',
		//'htmlmin',
		'sync:build',
		'clean'
	]);

	grunt.registerTask('dev', [
		'sass:dev',
		'autoprefixer:dev',
		'browserSync',
		'watch'
	]);

}