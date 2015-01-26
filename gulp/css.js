module.exports = function(gulp) {

  var autoprefixer = require("gulp-autoprefixer");
  var compass      = require('gulp-compass');
  var runSequence  = require('run-sequence');
  var scsslint     = require('gulp-scss-lint');
  var csscomb      = require('gulp-csscomb');

  var PC     = 'pc/';
  var SP     = 'sp/';
  var SHARED = 'shared/';

  var scsslint_config = {
      'bundleExec': true
      };

  var compass_config = {
        config_file: './config.rb',
        bundle_exec: true,
        css: 'css',
        sass: 'sass'
      };

  var setCompassConfigPath = function( target ) {
    compass_config.css = target + 'out/css/';
    compass_config.sass = target + 'sass/';
  };

  var compassCompile = function() {
    return gulp.src( compass_config.sass + "**/*" )
      .pipe(autoprefixer())
      .pipe(csscomb())
      .pipe(scsslint())
      .pipe(compass(compass_config));
  };

  /**
   * sassのコンパイル
   */

  // shared
  gulp.task('shared-css', function() {
    setCompassConfigPath(SHARED);
    return compassCompile();
  });

  // pc
  gulp.task('pc-css', function() {
    setCompassConfigPath(PC);
    return compassCompile();
  });

  // sp
  gulp.task('sp-css', function() {
    setCompassConfigPath(SP);
    return compassCompile();
  });

  // all
  gulp.task('css', function() {
    runSequence('pc-css', 'sp-css', 'shared-css');
  });
};
