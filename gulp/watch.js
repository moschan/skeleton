module.exports = function(gulp, args, DIRS) {

  var shell = require('gulp-shell');

  gulp.task('watch', shell.task([
    'gulp js -w;gulp css -w'
  ]));

};
