const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jscs = require('gulp-jscs');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sequence = require('gulp-sequence');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const karma = require('karma').server;
const isparta = require('isparta');
const babel = require('babel/register');

function unitTests() {
    return gulp.src(['tests/unit/**/*.js'])
        .pipe(mocha({
            reporter: 'spec',
            compilers: {
                js: babel
            }
        }));
}

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(jscs());
});

gulp.task('coverage', function (done) {
    gulp.src(['src/**/*.js'])
        .pipe(istanbul({
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            unitTests()
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }))
                .on('end', done);
        });
});

gulp.task('test:unit', function () {
    return unitTests();
});

gulp.task('test:integration', function (done) {
    karma.start({
        configFile: path.join(__dirname, '/tests/config/karma.conf.js'),
        singleRun: true
    }, done);
});

gulp.task('browserify', function () {
    return browserify({
        entries: './build.js',
        debug: true,
        transform: [babelify]
    })
        .bundle()
        .pipe(source('lib-build.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
    return gulp.src('dist/lib-build.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', sequence('browserify', 'compile'));
gulp.task('test', sequence('coverage', 'build', 'test:integration'));
gulp.task('default', sequence('lint', 'test'));
