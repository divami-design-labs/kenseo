var gulp = require('gulp');
var fs = require('fs');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
// var template = require('gulp-lodash-template');
var sass = require('gulp-sass');
// var prettify = require('gulp-prettify');
var path = require('path');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var stringify = require('stringify-object');
var notify = require('gulp-notify');
// var uglify = require('gulp-uglify');

function spriteChanges() {
    return gulp
        // looks for each folder inside "bundle-svgs" folder
        .src('bundle-svgs/kenseo-sprt/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('assets/imgs/'));
}


var babel = require("gulp-babel");

function babelChange(){
    return gulp.src("js/babel-app/**/*.js")
        // .pipe(sourcemaps.init())
        // .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); })
        .pipe(babel())
        .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); })
        // .pipe(sourcemaps.write('.'))
        // .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); })
        .pipe(gulp.dest("js/app/"))
        .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); });
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
    })).on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); })
        .pipe(tap(function () {
        // Append the above "file name" and "file path"
        fs.writeFile('templates.js', "var templates =  " + stringify(templates).replace(/[\n\r]*\s\s+/g, " "));
    })).on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); });

    // return gulp.src('assets/templates/**.html')
    //     .pipe(template({
    //       commonjs: true,
    //       // amd: true,
    //       strict: true
    //     }))
    //     .pipe(gulp.dest('new/'));
}

function sassChange(){
  gulp.src(['assets/styles/sass/**/*.scss', 'assets/styles/sass-utilities/**/*.scss'])
    // .pipe(sourcemaps.init())
    // TO DO: remove comments while compiling sass to css "sourceComments: false" doesn't work.
    .pipe(sass({outputStyle: 'expanded', sourceComments: false})
    .on('error', sass.logError))
    // .pipe(sourcemaps.write('maps/'))
    // .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); })
    .pipe(gulp.dest('assets/styles/css'))
    .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); });
}

function watchChanges(){
    templateChange();
    sassChange();
    // babelChange(/*{ blacklist: ["strict"] }*/);
    spriteChanges();
    gulp.watch([
        'assets/templates/**/*.html',
        'assets/styles/sass/**/*.scss',
        'assets/styles/sass-utilities/**/*.scss',
        // 'js/babel-app/**/*.js',
        'bundle-svgs/**/*.svg'
    // ], ['template', 'sass', 'babel','kenseo-sprt']);
    ], ['template', 'sass', 'kenseo-sprt']);
}

// Tasks
gulp.task('sass', sassChange);
gulp.task('template', templateChange);
gulp.task('babel', babelChange);
gulp.task('watch', watchChanges);
gulp.task('kenseo-sprt', spriteChanges);