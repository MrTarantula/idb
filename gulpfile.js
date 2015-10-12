var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var server = require('gulp-express');
var flatten = require('gulp-flatten');


var path = {
    src: 'src/**/*',
    build: 'build/',
    lib: 'bower_components/**/*'
};

gulp.task('default', ['build']);

gulp.task('clean', function (cb) {
    del(path.build, cb);
});

gulp.task('build', function (cb) {
    gulp.start(['js', 'lib', 'css', 'libCSS', 'index', 'cache']);
    cb();
});


gulp.task('js', function () {
    return gulp.src(path.src + '.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest(path.build))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest(path.build));

});

gulp.task('lib', function () {
    return gulp.src(path.lib + '.min.js')
        .pipe(flatten())
        .pipe(gulp.dest(path.build + '/lib'));
});

gulp.task('libCSS', function () {
    return gulp.src(path.lib + '.min.css')
        .pipe(flatten())
        .pipe(gulp.dest(path.build + '/lib'));

});

gulp.task('css', function () {
    return gulp.src(path.src + '.{scss,css}')
        .pipe(concat('all.css'))
        .pipe(sass())
        .pipe(gulp.dest(path.build))
        .pipe(minifyCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest(path.build));
});

gulp.task('cache', function () {
    return gulp.src([path.src + '.html', '!' + path.src + 'index.html'])
        .pipe(templateCache({
            module: 'ideabox'
        }))
        .pipe(gulp.dest(path.build));
});

gulp.task('index', function () {
    return gulp.src(path.src + 'index.html')
        .pipe(gulp.dest(path.build));
});

gulp.task('serve', function () {
    server.run(['app.js']);
});
