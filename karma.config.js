const commonjs = require('rollup-plugin-commonjs');
const istanbul = require('rollup-plugin-istanbul');
const resolve = require('rollup-plugin-node-resolve');
const builds = require('./rollup.config');

module.exports = function(karma) {
	const args = karma.args || {};
	const regex = args.watch ? /\.js$/ : /\.min\.js$/;
	const build = builds.filter((v) => v.output.file.match(regex))[0];

	if (args.watch) {
		build.output.sourcemap = 'inline';
	}

	karma.set({
		browsers: ['firefox'],
		frameworks: ['jasmine'],
		reporters: ['spec', 'kjhtml'],
		logLevel: karma.LOG_WARN,

		files: [
			'node_modules/luxon/build/global/luxon.js',
			'node_modules/chart.js/dist/Chart.js',
			'test/index.js',
			'src/index.js'
		].concat(args.inputs),

		// Explicitly disable hardware acceleration to make image
		// diff more stable when ran on Travis and dev machine.
		// https://github.com/chartjs/Chart.js/pull/5629
		customLaunchers: {
			firefox: {
				base: 'Firefox',
				prefs: {
					'layers.acceleration.disabled': true
				}
			}
		},

		preprocessors: {
			'test/specs/**/*.js': ['rollup'],
			'test/index.js': ['rollup'],
			'src/index.js': ['sources']
		},

		rollupPreprocessor: {
			plugins: [
				resolve(),
				commonjs()
			],
			external: [
				'chart.js'
			],
			output: {
				format: 'umd',
				globals: {
					'chart.js': 'Chart'
				}
			},
			onwarn: warning => {
				// Silence warnings about Luxon's circular dependencies
				// as we can't do anything about them.
				if (warning.code !== 'CIRCULAR_DEPENDENCY') {
					console.warn('(!) ' + warning.message);
				}
			},
		},

		customPreprocessors: {
			sources: {
				base: 'rollup',
				options: build
			}
		}
	});

	if (args.coverage) {
		karma.reporters.push('coverage');
		karma.coverageReporter = {
			dir: 'coverage/',
			reporters: [
				{ type: 'html', subdir: 'html' },
				{ type: 'lcovonly', subdir: '.' }
			]
		};
		[
			karma.rollupPreprocessor,
			karma.customPreprocessors.sources.options
		].forEach((v) => {
			(v.plugins || (v.plugins = [])).push(
				istanbul({
					include: 'src/**/*.js'
				}));
		});
	}
};
