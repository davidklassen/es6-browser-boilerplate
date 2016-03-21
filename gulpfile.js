const path = require('path');
const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');
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
    return buildScript(false);
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

gulp.task('watch', function () {
    buildScript(true);
});

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    console.log("Error: ", args[0].loc, args[0].filename);
    this.emit('end');
}

function buildScript(watch) {
    var props = {
        entries: './build.js',
        debug : true,
        transform: [babelify]
    };

    // watchify() if watch requested, otherwise run browserify() once
    var bundler = watch ? watchify(browserify(props), {poll: true}) : browserify(props);

    function rebundle() {
        var stream = bundler.bundle();
        return stream
            .on('error', handleErrors)
            .pipe(source('lib-build.js'))
            .pipe(gulp.dest('dist'));
    }
    bundler.on('update', function() {
        rebundle();
        plugins.util.log('Rebundle...');
    });

    return rebundle();
}