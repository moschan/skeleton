module.exports = function(gulp, args, DIRS) {
  'use strict';

  var autoprefixer = require("gulp-autoprefixer");
  var compass      = require('gulp-compass');
  var runSequence  = require('run-sequence');
  var scsslint     = require('gulp-scss-lint');
  var csscomb      = require('gulp-csscomb');
  var plumber      = require('gulp-plumber');
  var notify       = require('gulp-notify');
  var minimist = require('minimist');

  var scsslint_config = { 'bundleExec': true };

  // combをかける
  var cssComb = function( target ) {
    var input_dir = target + '/sass/**/*.scss';
    var output_dir = target + '/sass';
    gulp.src( input_dir )
      .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
      .pipe(csscomb())
        .pipe(gulp.dest( output_dir ));
  };

  var compassCompile = function( target ) {
    // Compassコンパイル設定
    var compass_config = {
          config_file: './config.rb',
          bundle_exec: true,
          css: target + '/out/css/',
          sass: target + '/sass/'
        };
    // ビルド用
    if (args.e === 'production') {
          compass_config.style = 'compressed';
          compass_config.sourcemap = true;
    }
    // コンパイル
    gulp.src( compass_config.sass + "**/*.scss" )
      .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
      .pipe(compass(compass_config))
      .pipe(autoprefixer({
            browsers: ['ie >= 8'],
            cascade: false
      }))
      .pipe(gulp.dest(compass_config.css));
      // .pipe(scsslint({'config': 'scss-lint.yml'}))
  };

  gulp.task('comb-css', function() {
    gulp.src( compass_config.sass + "**/*.scss" )
      .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
      .pipe(csscomb())
      .pipe(gulp.dest(compass_config.sass));
  });

  var compile = function(targets) {
    // 対象を全てコンパイル
    targets.map(compassCompile);
  };

  var watch = function(targets) {
    var watch_dir = '/sass/**/*.scss';
    // 対象を全てコンパイル
    targets.map(function(target){
      gulp.watch( target + watch_dir, function() {
        compile([target]);
      });
    });
  };

  /**
   * sassのコンパイル
   */

  gulp.task('css', function() {
    // 何かdirectoryタイプが指定されていた場合はそのディレクトリを対象に実行
    args.d = typeof(args.d) === 'string' ? [args.d] : args.d;
    args.d = (typeof(args.d) === 'undefined') || (typeof(args.d) === true) ? DIRS : args.d;

    // comb
    if( args.c === true ) {
      args.d.map(cssComb);
      return;
    }

    // watch
    if( args.w === true ) {
      watch(args.d);
    } else {
      compile(args.d);
    }
  });
};
