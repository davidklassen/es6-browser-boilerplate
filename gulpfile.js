const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jscs = require('gulp-jscs');
const mocha = require('gulp-mocha');
const del = require('del');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(jscs());
});

gulp.task('test', function () {
    require('babel/register');
    return gulp.src(['tests/unit/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('build', ['clean'], function () {
    return browserify({
        entries: './build.js',
        debug: true,
        transform: [babelify]
    })
        .bundle()
        .pipe(source('lib-build.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (cb) {
    del('dist', cb);
});

gulp.task('default', ['lint', 'test', 'build']);
