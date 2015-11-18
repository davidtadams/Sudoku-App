var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/* all gulp tasks to build production code */
gulp.task('build-moveHTML', function() {
  gulp
    .src('./*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('build-moveCSS', function() {
  gulp
    .src('./css/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('build-cat-minify-jquery-js', function() {
  return gulp.src(['./scripts/jquery-1.4.2.js', './scripts/jquery.hotkeys.js'])
    .pipe(concat('jquery.min.js'))
    .pipe(gulp.dest('./scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./scripts'))
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('build-cat-minify-game-js', function() {
  return gulp.src(['./scripts/SudokuGame.js', './scripts/game.js'])
    .pipe(concat('game.min.js'))
    .pipe(gulp.dest('./scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./scripts'))
    .pipe(gulp.dest('./build/scripts'));
});

/* all gulp tasks to make a automated dev enviroment */
gulp.task('dev-cat-min-js', function() {
  return gulp.src(['./scripts/SudokuGame.js', './scripts/game.js'])
    .pipe(concat('game.min.js'))
    .pipe(gulp.dest('./scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./scripts'))
    .pipe(reload({stream: true}));
})

gulp.task('dev-js-watch', ['dev-cat-min-js'], reload);

gulp.task('dev-serve', ['dev-cat-min-js'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("*.html").on("change", reload);
  gulp.watch("*.css").on("change", reload);
  gulp.watch("scripts/*.js", ['dev-js-watch']);
})

/* gulp cli runners */
gulp.task('default', ['build']);
gulp.task('build', ['build-moveHTML', 'build-moveCSS', 'build-cat-minify-jquery-js', 'build-cat-minify-game-js']);
gulp.task('dev', ['dev-serve']);
