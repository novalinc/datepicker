const gulp = require('gulp');
const del = require('del');

gulp.task('default', function() {
    gulp.src([
        'package.json',
        'README.md'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    del(['aot', 'dist']).then(paths => {
        if (paths && paths.length > 0) {
            console.log('Cleaned files and folders:\n', paths.join('\n'));
        }
    });
});