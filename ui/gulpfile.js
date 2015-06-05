var gulp = require('gulp');
var fs = require('fs');
var tap = require('gulp-tap');
var path = require('path');
var stringify = require('stringify-object');


// task without watch
gulp.task('template-build', function () {
    var templates = {};

    gulp.src('app/templates/*/*.html')
    // Run a loop through all files in 'app/templates/*/*.html'
    .pipe(tap(function (file, t) {
        // For each file in the loop get "file name" and "file path"
        var filePath = file.relative;
        var fileNameWithExt = path.basename(filePath);
        var fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf("."));
        templates[fileName] = fs.readFileSync('app/templates/' + filePath, 'utf8');
    }))
        .pipe(tap(function () {
        // Append the above "file name" and "file path"
        fs.writeFile('app/common/templates.js', "var templates =  " + stringify(templates).replace(/[\n\r]*/g, ""));
    }));
});

// this runs the `bundle-templates` task before starting the watch (initial bundle)
gulp.task('watch', ['template-build'], function () {
    // now watch the templates and the js file and rebundle on change
    gulp.watch(['app/templates/*/*.html'], ['template-build']);
	// If you want to watch sass files using gulp, uncomment the below code
	// Alert: Better use Sass engine instead of this
	// gulp.watch(['assets/styles/sass/*.scss', 'assets/styles/sass-utilities/*.scss'], ['sass']);
});