var gulp = require('gulp')
var shell = require('gulp-shell')
var sass = require('gulp-sass')
var fs = require('fs')

gulp.task('template', shell.task(['brfs templateRunner.js > app/templates.js']))

gulp.task('sass', function () {
    gulp.src('./assets/styles/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/styles/css'));
});
gulp.task('watch', function(){
	gulp.watch(['app/templates/*/*.html', 'templateRunner.js'], ['template']);
	// If you want to watch sass files using gulp, uncomment the below code
	// Alert: Better use Sass engine instead of this
	// gulp.watch(['assets/styles/sass/*.scss', 'assets/styles/sass-utilities/*.scss'], ['sass']);
})
