var gulp = require('gulp');
var fs = require('fs');
var tap = require('gulp-tap');
var sourcemaps = require('gulp-sourcemaps');
// var template = require('gulp-lodash-template');
var sass = require('gulp-sass');
// var prettify = require('gulp-prettify');
var path = require('path');
var stringify = require('stringify-object');
var notify = require('gulp-notify');
// var uglify = require('gulp-uglify');

var babel = require("gulp-babel");

function babelChange(){
    return gulp.src("js/babel-app/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("js/app/"));
}

// task without watch
function templateChange() {
    var templates = {};  

    gulp.src('assets/templates/**/*.html')
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
        fs.writeFile('templates.js', "var templates =  " + stringify(templates).replace(/[\n\r]*\s\s+/g, " "));
    })).on('error', function(err){ notify(err.message); });

    // return gulp.src('assets/templates/**.html')
    //     .pipe(template({
    //       commonjs: true,
    //       // amd: true, 
    //       strict: true
    //     }))
    //     .pipe(gulp.dest('new/'));
}

function sassChange(){
  gulp.src('assets/styles/sass/**/*.scss')
    .pipe(sourcemaps.init())
    // TO DO: remove comments while compiling sass to css "sourceComments: false" doesn't work.
    .pipe(sass({outputStyle: 'expanded', sourceComments: false}).on('error', sass.logError))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest('assets/styles/css'));
}

function watchChanges(){
    templateChange();
    sassChange();
    babelChange();
    gulp.watch(['assets/templates/**/*.html','assets/styles/sass/**/*.scss', "js/babel-app/**/*.js"], ['template', 'sass', 'babel']);
}

// Tasks
gulp.task('sass', sassChange);
gulp.task('template', templateChange);
gulp.task('babel', babelChange);
gulp.task('watch', watchChanges);