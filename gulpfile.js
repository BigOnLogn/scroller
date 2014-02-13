var gulp = require('gulp')
  , gutil = require('gulp-util')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify');

var paths = {
  scripts: ['bower_components/**/*.js', 'public/js/**/*.js']
  ,styles: ['bower_components/**/*.js', 'public/css/**/*.css']
  ,assets: ['public/assets/*']
  ,main: ['public/index.html']
  ,server: ['./server.js']
};

gulp.task('default', ['scripts', 'styles', 'assets', 'main']);

gulp.task('server', ['scripts', 'styles', 'assets', 'main'], function() {
  return gulp.src('./server.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('main', function() {
  return gulp.src(paths.main)
    .pipe(gulp.dest('dist/public'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('main.js'))
    .pipe(uglify('main.js'))
    .pipe(gulp.dest('dist/public/js/main.js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/public/css/main.css'));
});

gulp.task('assets', function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest('dist/public/assets'));
});

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean({read: false, force: true}));
});

gulp.task('watch', function() {
  gulp.watch('public/js/*.js', ['scripts']);
  gulp.watch('public/css/*.css', ['styles']);
});