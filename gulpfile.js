const gulp = require('gulp');
const rimraf = require('rimraf');
const browserify = require('browserify');
const watchify = require('watchify');
const tsify = require('tsify');
const scssify = require('scssify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();

gulp.task('clear', function(callback) {
    rimraf('./dist', callback);
});

gulp.task('copy-html', function() {
    return gulp.src(['src/**/*.html', 'src/favicon.ico'])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-assets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('build', function() {
    let bundler = browserify({
            basedir: '.',
            debug: true,
            entries: ['src/app/main.ts'],
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .transform(scssify, {
            autoInject: 'verbose'
        });

    const bundle = function() {
        return bundler
            .bundle()
            .on('error', console.error)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('dist'));
    };

    bundler = watchify(bundler, {
        delay: 10000
    });
    bundler.on('update', function(e) {
        console.info(new Date().toLocaleString() + ' updated', e);
        bundle();
    });

    return bundle();
});

gulp.task('rebuild', gulp.series(['clear', 'copy-html', 'copy-assets', 'build']));

gulp.task('serve', gulp.series(['rebuild'], function() {
    browserSync.init({
        server: './dist',
        open: false
    });
}));