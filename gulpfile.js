const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jscs = require('gulp-jscs');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const closureCompiler = require('gulp-closure-compiler');
const karma = require('karma').server;
const isparta = require('isparta');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(jscs());
});

gulp.task('test:unit', function (done) {
    require('babel/register');
    gulp.src(['src/**/*.js'])
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['tests/unit/**/*.js'])
                .pipe(mocha({ reporter: 'spec' }))
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }))
                .on('end', done);
        });
});

gulp.task('test:integration', ['test:unit', 'build', 'compile'], function (done) {
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
