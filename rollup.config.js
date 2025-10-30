import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default {
  input: 'src/tracking-number-card.ts',
  output: {
    file: 'dist/tracking-number-card.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    json(),
    typescript({
      declaration: false,
      sourceMap: true
    }),
    terser({
      compress: {
        drop_console: false
      },
      format: {
        comments: false
      }
    })
  ]
};
