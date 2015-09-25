var gulp = require('gulp');
var fs = require('fs');
var tap = require('gulp-tap');
var path = require('path');
var stringify = require('stringify-object');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

// var babel = require("gulp-babel");

// gulp.task("babel", function () {
//   return gulp.src("js/babel-app/**")
//     .pipe(babel())
//     .pipe(gulp.dest("js/app/"));
// });

// task without watch
gulp.task('template-build', function () {
    var templates = {};  

    gulp.src('assets/templates/*/*.html')
    // Run a loop through all files in 'app/templates/*/*.html'
    .pipe(tap(function (file, t) {
        // For each file in the loop get "file name" and "file path"
        var filePath = file.relative;
        var fileNameWithExt = path.basename(filePath);
        var fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf("."));
        templates[fileName] = fs.readFileSync('assets/templates/' + filePath, 'utf8');
    })).on('error', function(err){ notify(err.message); })
        .pipe(tap(function () {
        // Append the above "file name" and "file path"
        fs.writeFile('templates.js', "var templates =  " + stringify(templates).replace(/[\n\r]*\s\s+/g, ""));
    })).on('error', function(err){ notify(err.message); });
});

// this runs the `bundle-templates` task before starting the watch (initial bundle)
gulp.task('watch', ['template-build'], function () {
    // now watch the templates and the js file and rebundle on change
    gulp.watch(['assets/templates/*/*.html'], ['template-build']);
    // If you want to watch sass files using gulp, uncomment the below code
    // Alert: Better use Sass engine instead of this
    // gulp.watch(['assets/styles/sass/*.scss', 'assets/styles/sass-utilities/*.scss'], ['sass']);
});


gulp.task('default', ['template-build'], function () {});