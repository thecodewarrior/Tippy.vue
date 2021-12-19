import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

const pkg = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    external: ['vue', 'tippy.js'],
    output: {
      name: 'TippyVue',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      globals: {
        'vue': 'Vue',
        'tippy.js': 'tippy'
      }
    },
    plugins: [
      typescript(),
      resolve(),
    ]
  },
  {
    input: 'src/index.ts',
    external: ['vue', 'tippy.js'],
    output: {
      name: 'TippyVue',
      file: pkg.browserMin,
      format: 'umd',
      sourcemap: true,
      globals: {
        'vue': 'Vue',
        'tippy.js': 'tippy'
      }
    },
    plugins: [
      typescript(),
      resolve(),
      terser(),
    ]
  },
  {
    input: 'src/index.ts',
    external: ['vue', 'tippy.js'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      typescript(),
      resolve(),
    ]
  },
]
