import path from 'path'
import resolvePlugin from '@rollup/plugin-node-resolve' // 依赖引用插件
import commonjsPlugin from '@rollup/plugin-commonjs' // commonjs模块转换插件
import jsonPlugin from '@rollup/plugin-json'
import { eslint } from 'rollup-plugin-eslint' // eslint插件
import ts2Plugin from 'rollup-plugin-typescript2'
const getPath = _path => path.resolve(__dirname, _path)
import packageJSON from './package.json'

const globals = {

}

const extensions = [
  '.js',
  '.ts',
]

const tsPlugin = ts2Plugin({
  tsconfig: getPath('./tsconfig.json'),
  extensions
})

const esPlugin = eslint({
  throwOnError: true,
  include: ['src/**/*.ts'],
  exclude: ['node_modules/**', 'lib/**', '__test__/**']
})

const commonConf = {
  input: getPath('./src/index.ts'),
  external: [],
  plugins:[
    resolvePlugin(extensions),
    commonjsPlugin(),
    esPlugin,
    tsPlugin,
    jsonPlugin()
  ],
  output: [
    { name: packageJSON.name, globals, file: packageJSON.main, format: 'umd' },
    { name: packageJSON.name, globals, file: packageJSON.module, format: 'es' },
  ]
}

export default commonConf