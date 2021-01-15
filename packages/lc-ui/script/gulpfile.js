const exec = require('child_process').exec;
const rimraf = require('rimraf');
const merge2 = require('merge2')
const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsConfigBase = require('../tsconfig.json')
const tsDefaultReporter = ts.reporter.defaultReporter()

const tsconfig = {
  noUnusedParameters: true,
  noUnusedLocals: true,
  strictNullChecks: true,
  target: 'es6',
  jsx: 'preserve',
  moduleResolution: 'node',
  declaration: true,
  allowSyntheticDefaultImports: true,
  ...tsConfigBase.compilerOptions
}

function clean (done){
  rimraf.sync('../lib');
  done()
}

const TS_SOURCE = [
  '../components/**/*.js',
  '../components/**/*.jsx',
  '../components/**/*.tsx',
  '../components/**/*.ts',
  '!components/*/__tests__/*',
]


function compileDTS(){
  let error = 0

  const tsResult = gulp.src(TS_SOURCE).pipe(
    ts(tsconfig, {
      error(e){
        tsDefaultReporter.error(e)
        error = 1
      },
      finish: tsDefaultReporter.finish,
    })
  )

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1)
    }
  }

  tsResult.on('finish', check)
  tsResult.on('end', check)
  const tsd = tsResult.dts.pipe(gulp.dest('../lib/types'))

  return merge2([
    tsd
  ])
}

function buildLib(cb){
  return exec(`yarn lib`, (err, stdout, stderr) => {
    console.log('info: ', stdout)
    console.error('error: ', stderr)
    cb(err)
  })
}

exports.types = gulp.series(compileDTS)
exports.buildLib = gulp.series(buildLib)
exports.default = gulp.series(clean, buildLib, compileDTS)