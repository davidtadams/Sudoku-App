var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/* all gulp tasks to build production code */
gulp.task('build-moveHTML', function() {
  gulp
    .src('*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build-moveCSS', function() {
  gulp
    .src('css/*.css')
    .pipe(gulp.dest('build/css'));
});

gulp.task('build-moveJS', function() {
  gulp
    .src(['js/modernizr.js', 'js/foundation.min.js'])
    .pipe(gulp.dest('build/js'));
});

gulp.task('build-cat-minify-jquery-js', function() {
  return gulp.src(['js/jquery.js', 'js/jquery.hotkeys.js'])
    .pipe(concat('jquery.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('build-cat-minify-game-js', function() {
  return gulp.src(['js/SudokuGame.js', 'js/game.js'])
    .pipe(concat('game.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('build/js'));
});

/* all gulp tasks to make a automated dev enviroment */
gulp.task('dev-cat-min-js', function() {
  return gulp.src(['js/SudokuGame.js', 'js/game.js'])
    .pipe(concat('game.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
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
  gulp.watch("css/*.css").on("change", reload);
  gulp.watch("js/*.js", ['dev-js-watch']);
})

/* gulp cli runners */
gulp.task('default', ['build']);
gulp.task('build', ['build-moveHTML', 'build-moveCSS', 'build-moveJS', 'build-cat-minify-jquery-js', 'build-cat-minify-game-js']);
gulp.task('dev', ['dev-serve']);
