module.exports = function(gulp, args, DIRS) {

  var browserify   = require('browserify');
  var plumber      = require('gulp-plumber');
  var source       = require('vinyl-source-stream');
  var concat       = require('gulp-concat');
  var mainBowerFiles = require('main-bower-files');
  var jscs         = require('gulp-jscs');
  var eslint       = require('gulp-eslint');
  var uglify       = require('gulp-uglify');
  var gStreamify   = require('gulp-streamify');
  var runSequence  = require('run-sequence');

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
    .pipe(gStreamify(uglify('bundle.js', {outSourceMap: true})))
    .pipe(gulp.dest( target + '/out/js/'));
  };

  var vendorCompile = function( target ) {
    // bower用に整形
    target.substring(1,1);
    return gulp.src( mainBowerFiles({
      paths: {
        bowerDirectory: target + "/components",
        bowerJson: target + "/bower.json"
      } }))
      // .pipe(uglify())
      .pipe(gulp.dest( target + '/out/js/'));
  };

  var compile = function(targets) {
    // 対象を全てコンパイル
    targets.map(jsCompile);
  };

  var vendor = function(targets) {
    // 対象を全てコンパイル
    targets.map(vendorCompile);
  };

  var watch = function(targets) {
    var watch_dir = '/js/**/*.js';
    // 対象を全てコンパイル
    targets.map(function(target){
      gulp.watch( target + watch_dir, function() {
        compile([target]);
      });
    });
  };

  /**
   * javascriptのコンパイル
   */

  gulp.task('js', function() {
    // 何かdirectoryタイプが指定されていた場合はそのディレクトリを対象に実行
    args.d = typeof(args.d) === 'string' ? [args.d] : args.d;
    args.d = (typeof(args.d) === 'undefined') || (typeof(args.d) === true) ? DIRS : args.d;

    // bowerで取ってきたベンダーのコンパイル
    if( args.b === true ) {
      vendor(args.d);
      return;
    }

    if( args.w === true ) {
      watch(args.d);
    } else {
      compile(args.d);
    }
  });

};
