var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

var port = process.env.PORT || 8080;
var reloadPort = process.env.RELOAD_PORT || 35729;

gulp.task('build', function () {
  return gulp.src('./app')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', function () {
  connect.server({
    port: port,
    livereload: {
      port: reloadPort
    }
  });
});

gulp.task('reload-js', function () {
  return gulp.src('./dist/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./dist/*.js'], ['reload-js']);
});

gulp.task('default', [ 'build', 'serve', 'watch']);
