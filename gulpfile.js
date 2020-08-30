var gulp = require('gulp');
var path = require('path');
var fs = require('fs');

var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync').create();

// var cssnano = require('cssnano');
// var sourcemaps = require('gulp-sourcemaps');

// var uglify = require('gulp-uglify');
var gulpInject = require('gulp-inject');
// var concat = require('gulp-concat');

var templateCache = require('gulp-angular-templatecache');

var gulpClean = require('gulp-clean');

// var runSequence = require('run-sequence');
// var rev = require('gulp-rev');
// var revAll = require('gulp-rev-all');

var argv = require('yargs').argv;

var wiredep = require('wiredep').stream;
// var mainBowerFiles = require('main-bower-files');


if (argv.production) {
    console.log("PRODUCTION ENVIRONMENT");
}

var paths = {
    src: 'src',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    tasks: 'gulp_tasks'
};

var folders = {
    js: 'app/js',
    css: 'app/css',
    fonts: 'app/fonts',
    images: 'app/images',
    all: '**/*'
};

var files = {
    js: '**/*.js',
    css: '**/*.css',
    html: '**/*.html',
    images: '**/*.jpg',
    all: '**/*.*'
};

// gulp.task('buildcss', function () {
//     return gulp.src(path.join(paths.src, files.css))
//         .pipe(concat('fireslack.min.css'))
//         .pipe(cssnano())
//         .pipe(gulp.dest(paths.dist));
// });

// gulp.task('buildjs', ['buildhtml'], function () {
//     return gulp.src([
//         path.join(paths.src, '**/*.module.js'),
//         path.join(paths.src, files.js),
//         path.join(paths.dist, files.js)
//     ]).pipe(concat('fireslack.min.js'))
//       .pipe(uglify())
//       .pipe(gulp.dest(paths.dist));
// });

// gulp.task('buildhtml', function () {
//     return gulp.src(path.join(paths.src, files.html))
//         .pipe(templateCache('template-cache.js', {
//             module: 'fireslack.utils',
//             standalone: false
//         }))
//         .pipe(gulp.dest(path.join(paths.dist, folders.js)));
// });

// gulp.task('buildlibcss', function () {
//     return gulp.src(mainBowerFiles({ filter: '**/*.css' }))
//         .pipe(concat('app.vendor.min.css'))
//         .pipe(cssnano())
//         .pipe(gulp.dest(paths.dist));
// });

// gulp.task('buildlibjs', function () {
//     return gulp.src(mainBowerFiles({ filter: '**/*.js' }))
//         .pipe(concat('app.vendor.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(paths.dist));
// });

// gulp.task('build', ['buildcss', 'buildjs', 'buildlibcss', 'buildlibjs']);

// gulp.task('revision', ['build'], function () {
//     return gulp.src([path.join(paths.dist, '*.js'), path.join(paths.dist, '*.css')])
//         .pipe(revAll.revision())
//         .pipe(gulp.dest(paths.dist))
//         .pipe(revAll.manifestFile())
//         .pipe(gulp.dest(paths.dist))
//         .pipe(revAll.versionFile())
//         .pipe(gulp.dest(paths.dist));
// });

// gulp.task("inject-dist", ['revision'], function() {
//     var manifest= JSON.parse(fs.readFileSync(paths.dist + "/rev-manifest.json"));
//     var arr = [];
//     var revArr = [];
//     for(var fileName in manifest) {
//         // For files versioned
//         if (fileName !== manifest[fileName]) {
//             // Add the revisioned filename to inject
//             revArr.push(path.join(paths.dist, manifest[fileName]));
//             // Add the original filename to delete
//             arr.push(path.join(paths.dist, fileName));
//         }
//     }
//     return gulp.src(path.join(paths.dist, 'index.html'))
//         .pipe(inject(gulp.src(revArr.reverse(), {read: false}), {relative: true}))
//         .pipe(gulp.dest(paths.dist));
// });


// gulp.task('copy-dist',  function() {
//     return gulp.src([
//         path.join(paths.src, folders.fonts),
//         path.join(paths.src, folders.images),
//         path.join(paths.src, 'index.html'),
//         path.join(paths.src, 'favicon.ico')])
//         .pipe(gulp.dest(paths.dist));
// });

// gulp.task('dist', function(callback) {
//     runSequence('clean', 'copy-dist', 'inject-dist', callback);
// });

var wiredepOptions = {
    exclude: [
        // 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        // 'bower_components/moment/moment.js'
    ]
};

gulp.task('clean', function (cb) {
    // cb();
    return gulp.src([path.join(paths.dist, files.all), path.join(paths.tmp, files.all)], { read: false })
        .pipe(gulpClean());
});

gulp.task('template-cache', function (cb) {
    // cb();
    return gulp.src(path.join(paths.src, files.html))
        .pipe(templateCache('template-cache.js', {
            module: 'fireslack.utils',
            standalone: false,
            root: ''
        }))
        .pipe(gulp.dest(path.join(paths.tmp, folders.js)));
});

gulp.task('copy-tmp', function (cb) {
    // cb();
    return gulp.src(path.join(paths.src, '**/*.*'))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('inject-tmp', function (cb) {
    // cb();
    return gulp.src(path.join(paths.tmp, 'index.html'))
        .pipe(wiredep(wiredepOptions))
        // to get rid of all Uncaught Error: [$injector:modulerr].
        .pipe(gulpInject(gulp.src([path.join(paths.tmp, '**/*.module.js'), path.join(paths.tmp, files.js)],
            { read: false }), { relative: true }))
        .pipe(gulpInject(gulp.src(path.join(paths.tmp, files.css), { read: false }), { relative: true }))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('browser', function (cb) {
    // var baseDir = path.join(__dirname,  paths.tmp, 'index.html');

    // Serve files from the root of this project
    browserSync.init({
        ui: {
            port: 3001
        },
        port: 3000,
        server: {
            baseDir: paths.tmp,
            index: 'index.html',
            middleware: [historyApiFallback()],
            routes: {
                "/bower_components": "bower_components"
            }
        },
        open: false,
        notify: false,
        reloadOnRestart: true
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(path.join(paths.src, files.all))
        .on('change', browserSync.reload);
});

gulp.task('serve', gulp.series(
    'clean',
    'template-cache',
    'copy-tmp',
    'inject-tmp',
    'browser',
));

// gulp.task('serve-dist', ['dist'], function () {

//     // Serve files from the root of this project
//     browserSync.init({
//         server: {
//             baseDir: paths.dist
//         },
//         // Stop the browser from automatically opening
//         open: false,
//         // Don't show any notifications in the browser.
//         notify: false,
//         // Reload browser automatically on restart of browsersync
//         reloadOnRestart: true
//     });
// });

gulp.task('default', function (cb) {
    console.log("GULP IS WORKING");

    cb();
});
