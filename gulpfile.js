var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssMin = require('gulp-minify-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', ['watch']);

gulp.task('js', function() {
	gulp.src(['js/*.js'])
	.pipe(concat('app.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('./'))
});

gulp.task('css', function() {
	gulp.src('sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(cssMin())
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
	gulp.watch('js/*.js', ['js']);
	gulp.watch('sass/*.scss', ['css']);
});

