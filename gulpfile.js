// require modules
var gulp         = require('gulp');
var runSequence = require('run-sequence');
var taskListing = require('gulp-task-listing');

// config
var PC     = './pc/';
var SP     = './sp/';
var SHARED = './shared/';

// require tasks
require('./gulp/css.js')(gulp);
require('./gulp/js.js')(gulp);
require('./gulp/watch.js')(gulp);

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

// build task
// gulp.task('build', ['vendor']);
