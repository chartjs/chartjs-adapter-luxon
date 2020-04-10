/* eslint-disable import/no-commonjs */
/* eslint-env es6 */


const babel = require('rollup-plugin-babel');
const cleanup = require('rollup-plugin-cleanup');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve');
const terser = require('rollup-plugin-terser').terser;
const pkg = require('./package.json');

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * (c) ${new Date().getFullYear()} Chart.js Contributors
 * Released under the ${pkg.license} license
 */`;

const input = 'src/index.js';

module.exports = [
	{
		input,
		plugins: [
			json(),
			resolve(),
			babel(),
			cleanup({
				sourcemap: true
			})
		],
		output: {
			file: `dist/${pkg.name}.js`,
			banner: banner,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart',
				luxon: 'luxon'
			}
		},
		external: [
			'chart.js',
			'luxon'
		]
	},
	{
		input,
		plugins: [
			json(),
			resolve(),
			babel(),
			terser({
				output: {
					preamble: banner
				}
			})
		],
		output: {
			file: `dist/${pkg.name}.min.js`,
			format: 'umd',
			indent: false,
			globals: {
				'chart.js': 'Chart',
				luxon: 'luxon'
			}
		},
		external: [
			'chart.js',
			'luxon'
		]
	},

	// ES6 builds
	// dist/Chart.esm.min.js
	// dist/Chart.esm.js
	{
		input,
		plugins: [
			json(),
			resolve(),
			babel({envName: 'es6'}),
			cleanup({
				sourcemap: true
			})
		],
		output: {
			file: `dist/${pkg.name}.esm.js`,
			banner,
			format: 'esm',
			indent: false,
		},
		external: [
			'chart.js',
			'luxon'
		]
	},
	{
		input,
		plugins: [
			json(),
			resolve(),
			babel({envName: 'es6'}),
			terser({
				output: {
					preamble: banner
				}
			})
		],
		output: {
			file: 'dist/${pkg.name}.esm.min.js',
			format: 'esm',
			indent: false,
		},
		external: [
			'chart.js',
			'luxon'
		]
	},
];
