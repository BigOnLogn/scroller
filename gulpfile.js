var gulp = require('gulp')
  , gutil = require('gulp-util')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , clean = require('gulp-clean')
  , livereload = require('gulp-livereload')
  , lr = require('tiny-lr')
  , server = lr();

var paths = {
  scripts: ['bower_components/**/*.js', 'public/js/app.js', 'public/js/libs/pixi/bin/pixi.dev.js']
  ,styles: ['bower_components/**/*.js', 'public/css/**/*.css']
  ,assets: ['public/assets/*']
  ,main: ['public/index.html']
  ,server: ['./server.js']
};

gulp.task('default', ['clean'], function() {
  return gulp.start('scripts', 'styles', 'assets', 'main', 'server');
});

gulp.task('server', ['scripts', 'styles', 'assets', 'main'], function() {
  return gulp.src('./server.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('main', function() {
  return gulp.src(paths.main)
    .pipe(gulp.dest('dist/public'))
    .pipe(livereload(server));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest('dist/public/js'))
    .pipe(livereload(server));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(gulp.dest('dist/public/css'))
    .pipe(livereload(server));
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
  server.listen(35729, function(err) {
    if (err) {
      return console.log(err);
    }
    gulp.watch('public/js/*.js', ['scripts']);
    gulp.watch('public/css/*.css', ['styles']);
    gulp.watch('public/*.html', ['main']);
  });
});