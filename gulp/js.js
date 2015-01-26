module.exports = function(gulp) {

  var browserify   = require('browserify');
  var plumber      = require('gulp-plumber');
  var source       = require('vinyl-source-stream');
  var concat       = require('gulp-concat');
  var bowerFiles   = require("gulp-bower-files");
  var jscs         = require('gulp-jscs');
  var eslint       = require('gulp-eslint');
  var uglify       = require('gulp-uglify');
  var gStreamify   = require('gulp-streamify');
  var runSequence  = require('run-sequence');

  /**
  * config
  */

  var PC     = './pc/';
  var SP     = './sp/';
  var SHARED = './shared/';


  var jsCompile = function( target ) {
    return browserify({
      entries: [ target + '/js/core.js']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest( target + '/out/js/'));
  };

  var jsBuild = function( target ) {
    return browserify({
      entries: [ target + '/js/core.js']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gStreamify(uglify()))
    .pipe(gulp.dest( target + '/out/js/'));
  };


  var jsCompileVendor = function( target ) {
    bowerFiles()
      .pipe(plumber())
      .pipe(concat('vendor.js'))
      .pipe(gStreamify(uglify()))
      .pipe(gulp.dest( target + '/out/js/'));
  };


  gulp.task('shared-js', function() {
    return jsCompile( SHARED );
  });

  gulp.task('shared-vendor', function() {
    return jsCompileVendor( SHARED );
  });


  gulp.task('pc-js', function() {
    return jsCompile( PC );
  });

  gulp.task('pc-vendor', function() {
    return jsCompileVendor( PC );
  });


  gulp.task('sp-js', function() {
    return jsCompile( SP );
  });

  gulp.task('sp-vendor', function() {
    return jsCompileVendor( SP );
  });

  gulp.task('js', function() {
    runSequence('pc-js', 'sp-js', 'shared-js');
  });

  gulp.task('js-build', function() {
    jsCompile( SHARED );
    jsCompile( PC );
    jsCompile( SP );
  });

  gulp.task('vendor', function() {
    runSequence('pc-vendor', 'sp-vendor', 'shared-vendor');
  });

};
