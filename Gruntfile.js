module.exports = function(grunt) {
	
	grunt.initConfig({
		AT_CSS_PATH: '<%= AT_PATH %>style/szorozz.css',
		AT_JS_PATH: '<%= AT_PATH %>script/szorozz.min.js',
		AT_PATH: 'tmp/asset_templates/',
		BUILD_PATH: 'build/',
		CC_PATH: 'tmp/concat/',
		TEMP_JS_PATH: 'tmp/script/szorozz.js',
		TEMP_JS_MIN_PATH: 'tmp/script/szorozz.min.js',

		appcache: {
			compile: {
				options: {
					basePath: 'build'
				},
				dest: 'build/index.appcache',
				cache: {
					patterns: ['build/**', '!build/*.html']
				},
				network: '*'
			}
		},
		clean: {
			compile: ['build', 'tmp']
		},
		concat: {
			compile: {
				src: ['src/concat/respond.min.js', 'src/concat/modernizr.custom.02462.js', 'src/concat/jquery-1.11.2.min.js', '<%= TEMP_JS_MIN_PATH %>'],
				dest: '<%= AT_JS_PATH %>'
			}
		},
		copy: {
			debug: {
				files: [
					{src: ['<%= TEMP_JS_PATH %>'], dest: '<%= TEMP_JS_MIN_PATH %>'}
				]
			},
			compile: {
				files:[{
					expand: true,
					cwd: 'src/dropin',
					dot: true,
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}, {
					expand: true,
					cwd: 'tmp/dropin',
					dot: true,
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}]
			}
		},
		kapocs: {
			compile: {
				assets: [{
					expand: true,
					cwd: 'src/assets',
					dot: true,
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}],
				assetTemplates: [{
					expand: true,
					cwd: 'src/asset_templates',
					dot: true,
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}, {
					expand: true,
					cwd: 'tmp/asset_templates',
					dot: true,
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}],
				templates: [{
					expand: true,
					cwd: 'src/templates',
					dot: true,
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}, {
					expand: true,
					cwd: 'tmp/templates',
					dot: true,
					src: ['**'],
					dest: '<%= BUILD_PATH %>'
				}]
			}
		},
		less: {
			compile: {
				options: {
					compress: true
				},
				files: {
					'<%= AT_CSS_PATH %>': 'src/less/_desktop.less'
				}
			},
			debug: {
				files: {
					'<%= AT_CSS_PATH %>': 'src/less/_desktop.less'
				}
			}
		},
		typescript: {
			compile: {
				files: {
					'<%= TEMP_JS_PATH %>': 'src/sz/Main.ts'
				}
			},
			tests: {
				files: {}
			}
		},
		sas: {
			update: {}
		},
		shell: {
			update: {
				command: ['bower prune', 'bower update', 'bower install'].join('&&')
			}
		},
		uglify: {
			compile: {
				files: {
					'<%= TEMP_JS_MIN_PATH %>': ['<%= TEMP_JS_PATH %>']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-appcache');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-kapocs');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-sas');
	grunt.loadNpmTasks('grunt-typescript');
	
	grunt.registerTask('update', ['shell:update', 'sas:update']);
	grunt.registerTask('compile', ['clean:compile', 'copy:compile', 'typescript:compile', 'uglify:compile', 'typescript:tests', 'concat', 'less:compile', 'kapocs:compile', 'appcache:compile']);
	grunt.registerTask('debug', ['clean:compile', 'copy:compile', 'typescript:compile', 'typescript:tests', 'copy:debug', 'concat', 'less:debug', 'kapocs:compile', 'appcache:compile']);
	grunt.registerTask('default', ['compile']);
};