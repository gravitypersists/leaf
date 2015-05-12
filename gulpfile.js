var gulp = require('gulp');
var babel = require('gulp-babel');
var watchify = require('gulp-watchify');
var babelify = require('babelify');

gulp.task('browserify', watchify(function (watchify) {
  return gulp.src(['main.js', 'examples/example-loader.js'])
    .pipe(watchify({
      watch: false,
      setup: function (bundle) {
        bundle.transform(babelify);
      }
    }))
    .pipe(gulp.dest('dist/'));
}));

gulp.task('babel', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'examples/*.json'], ['babel', 'browserify']);
});

gulp.task('default', ['babel', 'browserify', 'watch']);
