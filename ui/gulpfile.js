var gulp = require('gulp');
var fs = require('fs');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// var template = require('gulp-lodash-template');
var sass = require('gulp-sass');
// var prettify = require('gulp-prettify');
var path = require('path');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var stringify = require('stringify-object');
var notify = require('gulp-notify');
var postTemplate = require('gulp-lodash-template');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var config = require('./config.json');

var svgs = [];


/*****************************************/
function generateSvg(){
    var svgGrouping = config['svg-grouping'];
    if(svgGrouping){
        for(var pageName in svgGrouping){
            // storing all page names in svgs global variable
            svgs.push(pageName);

            var pageSpecificSVGs = svgGrouping[pageName]; // Array

            // mapping the page specific variables with relative path
            var newPageSpecificSVGs = pageSpecificSVGs.map(function(p){ return 'bundle-svgs/' + p + '.svg' });
            gulp
                .src(newPageSpecificSVGs)
                .pipe(svgmin(function(file){
                    var prefix = path.basename(file.relative, path.extname(file.relative));
                    // console.log(prefix);
                    return {
                        plugins: [{
                            cleanupIDs: {
                                prefix: prefix + '-',
                                minify: true
                            }
                        }]
                    }
                }))
                .on('error', function(error){
                    gutil.log(error.message);
                })
                .pipe(svgstore())
                // Uncomment the below lines to add additional attributes to the generated SVG Sprite
                // .pipe(cheerio(function($, file){
                //     $('svg > symbol').attr('preserveAspectRatio', 'xMinYMid');
                // }))
                .on('error', function(error){
                    gutil.log(error.message);
                })
                .pipe(rename(pageName + '.svg'))
                // Store the generated svg sprite in "site/assets/images/" folder
                .pipe(gulp.dest('assets/imgs/'));
        }
    }
};

function sassChange(){
    var processors = [autoprefixer];
    gulp.src(['assets/styles/sass/**/*.scss', 'assets/styles/sass-utilities/**/*.scss'])
        // .pipe(sourcemaps.init())
        // TO DO: remove comments while compiling sass to css "sourceComments: false" doesn't work.
        .pipe(sass({outputStyle: 'expanded', sourceComments: false})
        .on('error', sass.logError))
        // .pipe(sourcemaps.write('maps/'))
        // .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); })
        .pipe(postcss(processors))
        .pipe(gulp.dest('assets/styles/css'))
        .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err.message)); });
}

function postTemplateChanges(){
    return gulp.src(['assets/templates/**/*.html'])
        .pipe(postTemplate({
            namespace: "templates",
            name: function(file){
                var filePath = file.relative;
                var fileNameWithExt = path.basename(filePath);
                var fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf("."));
                return fileName;
            }
        }))
        .on('error', function(err){ gutil.log(gutil.colors.red('ERROR:'),gutil.colors.red(err)); })
		.pipe(concat('templates.js'))
		.pipe(gulp.dest(''));
}

function watchChanges(){
    // templateChange();
    sassChange();
    postTemplateChanges();
    generateSvg();
    gulp.watch(['assets/templates/**/*.html'], ['template']);
    gulp.watch(['assets/styles/sass/**/*.scss', 'assets/styles/sass-utilities/**/*.scss'], ['sass']);
    gulp.watch(['bundle-svgs/*.svg'], ['generate-svg']);
}

// Tasks
gulp.task('sass', sassChange);
// gulp.task('template', templateChange);
gulp.task('template', postTemplateChanges);
// gulp.task('babel', babelChange);
gulp.task('generate-svg', generateSvg);
gulp.task('watch', watchChanges);
