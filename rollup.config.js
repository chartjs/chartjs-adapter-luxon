import {readFileSync} from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const {name, version, homepage, license} = JSON.parse(readFileSync('./package.json'));

const banner = `/*!
 * ${name} v${version}
 * ${homepage}
 * (c) ${new Date().getFullYear()} chartjs-adapter-luxon Contributors
 * Released under the ${license} license
 */`;

const input = 'src/index.js';
const external = [
  'chart.js',
  'luxon'
];
const globals = {
  'chart.js': 'Chart',
  luxon: 'luxon'
};

export default [
  {
    input,
    plugins: [
      //resolve(),
    ],
    output: {
      name,
      file: 'dist/chartjs-adapter-luxon.umd.js',
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  {
    input,
    plugins: [
      resolve(),
      terser({
        output: {
          preamble: banner
        }
      })
    ],
    output: {
      name,
      file: 'dist/chartjs-adapter-luxon.umd.min.js',
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  {
    input,
    plugins: [
      resolve(),
    ],
    output: {
      name,
      file: 'dist/chartjs-adapter-luxon.esm.js',
      banner,
      format: 'esm',
      indent: false,
    },
    external
  },
];
