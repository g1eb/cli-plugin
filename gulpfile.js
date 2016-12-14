var gulp = require('gulp');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
 
gulp.task('build', ['js', 'css']);

gulp.task('css', function () {
  gulp.src('src/*.css')
    .pipe(cssnano())
    .pipe(concat('cli-plugin.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(concat('cli-plugin.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.+(js|html|css)', ['build']);
});
