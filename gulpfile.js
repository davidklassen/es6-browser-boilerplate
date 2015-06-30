const path = require('path');
const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const karma = require('karma').server;
const isparta = require('isparta');
const babel = require('babel/register');
const plugins = require('gulp-load-plugins')();

function unitTests() {
    return gulp.src(['tests/config/setup.js', 'tests/unit/**/*.js'])
        .pipe(plugins.mocha({
            reporter: 'spec',
            compilers: { js: babel }
        }));
}

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', 'tests/**/*.js'])
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError())
        .pipe(plugins.jscs());
});

gulp.task('coverage', function (done) {
    gulp.src(['src/**/*.js'])
        .pipe(plugins.istanbul({
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(plugins.istanbul.hookRequire())
        .on('finish', function () {
            unitTests()
                .pipe(plugins.istanbul.writeReports())
                .pipe(plugins.istanbul.enforceThresholds({ thresholds: { global: 100 } }))
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
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', plugins.sequence('browserify', 'compile'));
gulp.task('test', plugins.sequence('coverage', 'build', 'test:integration'));
gulp.task('default', plugins.sequence('lint', 'test'));
