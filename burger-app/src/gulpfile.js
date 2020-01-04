'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
wait = require('gulp-wait'),
autoprefixer = require('gulp-autoprefixer'),
gls = require('gulp-live-server');

// Define tasks after requiring dependencies
function style() {

  // Where should gulp look for the sass files?
  // My .sass files are stored in the styles folder
  // (If you want to use scss files, simply look for *.scss files instead)
  return (
      gulp
          .src(['sass/main.scss'])
          .pipe(wait(200))

          // Use sass with the files found, and log any errors
          .pipe( sass({outputStyle: 'compressed', errLogToConsole: true }) )
          .on("error", sass.logError)

          .pipe(concat('style.css'))

          // -webkit- and so on
          .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'],cascade: false}))

          // What is the destination for the compiled file?
          .pipe(gulp.dest("css"))
  );
}

function watchFiles(){
    // var server = gls.static(); //equals to gls.static('public', 3000);
    // server.start();

  // gulp.watch takes in the location of the files to watch for changes
  // and the name of the function we want to run on change
  gulp.watch('sass/**', style);
}

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

// Don't forget to expose the task!
exports.watchFiles = watchFiles;