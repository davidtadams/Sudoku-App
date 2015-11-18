var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('moveHTML', function() {
  gulp
    .src('./*.html')
    .pipe(gulp.dest('./build'));
})

gulp.task('moveCSS', function() {
  gulp
    .src('./*.css')
    .pipe(gulp.dest('./build'));
})

gulp.task('cat-minify-js', function() {
  return gulp.src(['./scripts/jquery-1.4.2.js', './scripts/jquery.hotkeys.js', './scripts/SudokuGame.js', './scripts/game.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'));
})

gulp.task('default', ['moveHTML', 'moveCSS', 'cat-minify-js']);
