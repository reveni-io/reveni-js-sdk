import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import dotenv from 'rollup-plugin-dotenv'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  plugins: [babel({ presets: [['@babel/preset-env', { modules: false }]] }), dotenv()],
}
