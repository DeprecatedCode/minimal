var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var path = require('path');

var appdir = './app';

var lib = 'lib/*.js';

gulp.task('lib', function() {
  return gulp.src(lib)
    .pipe(jshint())
    .pipe(concat('m.js')) 
    .pipe(gulp.dest(appdir));
});

var style = 'style/*.less'
var styleAll = 'style/**/*.less'

gulp.task('style', function () {
  gulp.src(style)
    .pipe(less({
      paths: [ path.join(__dirname, 'style', 'includes') ]
    }))
    .pipe(gulp.dest(appdir));
});

var readme = 'readme/*.md';

gulp.task('readme', function() {
  return gulp.src(readme)
    .pipe(concat('README.md')) 
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(lib, ['lib']);
    gulp.watch(styleAll, ['style']);
    gulp.watch(readme, ['readme']);
});

gulp.task('default', ['lib', 'style', 'readme', 'watch']);
