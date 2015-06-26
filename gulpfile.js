const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jscs = require('gulp-jscs');
const mocha = require('gulp-mocha');
const del = require('del');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const closureCompiler = require('gulp-closure-compiler');
const karma = require('karma').server;

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(jscs());
});

gulp.task('test:unit', function () {
    require('babel/register');
    return gulp.src(['tests/unit/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test:integration', ['build', 'compile'], function (done) {
    karma.start({
        configFile: path.join(__dirname, '/tests/config/karma.conf.js'),
        singleRun: true
    }, done);
});

gulp.task('build', function () {
    return browserify({
        entries: './build.js',
        debug: true,
        transform: [babelify]
    })
        .bundle()
        .pipe(source('lib-build.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['build'], function () {
    return gulp.src('dist/lib-build.js')
        .pipe(closureCompiler({
            compilerPath: 'bower_components/closure-compiler/compiler.jar',
            fileName: 'lib-build.min.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', ['test:integration', 'test:unit']);
gulp.task('default', ['lint', 'test', 'build', 'compile']);
