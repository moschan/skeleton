module.exports = function(gulp) {
  /**
  * config
  */

  var runSequence = require('run-sequence');

  var PC     = './pc/';
  var SP     = './sp/';
  var SHARED = './shared/';

  gulp.task('watch-shared-css', function() {
    gulp.watch( SHARED + 'sass/**/*', function() {
      gulp.start('shared-css');
    });
  });

  gulp.task('watch-pc-css', function() {
    gulp.watch( PC + 'sass/**/*', function() {
      gulp.start('shared-css');
    });
  });

  gulp.task('watch-sp-css', function() {
    gulp.watch( SP + '/script/*', function() {
      gulp.run('script');
    });
  });

  gulp.task('watch-css', function() {
    runSequence(['watch-shared-css', 'watch-sp-css', 'watch-pc-css']);
  });



  gulp.task('watch-shared-js', function() {
    gulp.watch( SHARED + 'js/**/*', function() {
      gulp.start('shared-js');
    });
  });

  gulp.task('watch-pc-js', function() {
    gulp.watch( PC + 'js/**/*', function() {
      gulp.start('pc-js');
    });
  });

  gulp.task('watch-sp-js', function() {
    gulp.watch( SP + '/js/*', function() {
      gulp.run('sp-js');
    });
  });

  gulp.task('watch-js', function() {
    runSequence(['watch-shared-js', 'watch-sp-js', 'watch-pc-js']);
  });

  gulp.task('watch', function() {
    runSequence(['watch-css', 'watch-js']);
  });

};
