var gulp = require('gulp');
var ts = require('gulp-typescript');
const run = require('run-sequence');
const watch = require('gulp-watch');
var path = require("path");
var sourcemaps = require('gulp-sourcemaps');
const webpack = require('gulp-webpack');
var tsProject = ts.createProject("tsconfig.json");



gulp.task('default', function (done) {
    // return gulp.src('src/**/*.ts')
    //     .pipe(ts({
    //         noImplicitAny: true,
    //         out: 'output.js'
    //     }))
    //     .pipe(gulp.dest('built/local'));
      run('watch', done);
});
gulp.task('watch', () => {
  // Auto Compile TypeScript
  watch([
    './src/*/*/*.ts',
    './src/*/*.ts',
    './src/*.ts'
  ], function(file){
    run(['typescript']);
  });
});

gulp.task('typescript', function () {
  var option = {
    'base': './'
  };
  var src = [
    './src/*/*/*.ts',
    './src/*/*.ts',
    './src/*.ts'
  ];
  return gulp.src(src, option)
    .pipe(sourcemaps.init())
    .pipe(tsProject()).js
    .pipe(sourcemaps.write('./', {
      includeContent: false,
      sourceRoot: function (file) {
        return path.resolve(".");
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('build-production', (done) => {
  run('typescript', 'webpack', done);
});

gulp.task('webpack', () => {
  const config = require('./webpack.production.config.js');

  return gulp.src('../src/**/*.ts')
    .pipe(webpack(config))
    .pipe(gulp.dest('./'));
});
