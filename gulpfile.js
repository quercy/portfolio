var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssMin = require('gulp-minify-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var js_source_files = 'js/*.js';

/* 
	For the actual work of this file, see below. Gulp is wonky if I don't define the functions
	up here. 
*/

// Without an argument, it will source, concatenate, and uglify the js_source_files along with
// whatever is passed into the function, be it a string or array of files
function jsSources(sources) {
	var sourcearray = [];
	sourcearray.push(js_source_files);
	if(typeof(sources) === "undefined") {

	} else if (typeof(sources === "string")) {
		sourcearray.push(sources);
	} else if (typeof(sources === "object")) { 
		sourcearray = sourcearray.concat(sources);
	}
	gulp.src(sourcearray)
	.pipe(concat('app.js'))
	//.pipe(uglify())
	.pipe(gulp.dest('./'));
};

// When there is a compilation error, log it to the console, then recompile the JS sources
// with the sass_error file attached
function sassError(error) {
	sass.logError.call(this, error); 
	jsSources('sass_error.js');
};

gulp.task('default', ['watch', 'js', 'css']);

gulp.task('watch', function () {
	gulp.watch(js_source_files, ['js']);
	gulp.watch('sass/*.scss', ['css']);
});

gulp.task('js', jsSources());

gulp.task('css', function() {
	jsSources(); // For some reason, I have to do this instead of just watch the SASS files
	// and trigger the task - it breaks the concatenation
	gulp.src('sass/site.scss')
		.pipe(sass().on('error', sassError))
		.pipe(concat('style.css'))
		.pipe(cssMin())
		.pipe(gulp.dest('./'));
});


