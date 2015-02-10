// require modules
var gulp         = require('gulp');
var runSequence = require('run-sequence');
var taskListing = require('gulp-task-listing');
var hologram = require('gulp-hologram');
var clean = require('gulp-clean');

  var minimist = require('minimist');
  
// config
var PC     = './pc/';
var SP     = './sp/';
var SHARED = './shared/';

  // コマンドライン引数をparse
  var args = minimist(process.argv.slice(2));

  // プロジェクトのコンパイル対象ディレクトリ
  var DIRS = ['./shared', './pc', './sp'];

// require tasks
require('./gulp/css.js')(gulp, args, DIRS);
require('./gulp/js.js')(gulp, args, DIRS);
require('./gulp/watch.js')(gulp, args, DIRS);

// for chrome dev-tool
module.exports = gulp;

// Add a task to render the output
gulp.task('help', taskListing);

// default task
gulp.task('default', function() {
  console.log("Happy Coding!! :)");
});

// compile css&js
gulp.task('all', ['css','js']);

gulp.task('styleguide', function() {
  var configGlob = './styleguide/hologram_config.yml';
  var hologramOptions = {
    bundler: true
  };
  gulp.src('styleguide/out', {read: false})
    .pipe(clean({force: true}))
  gulp.src( configGlob )
    .pipe(hologram( hologramOptions ));
});
// build task
// gulp.task('build', ['vendor']);
