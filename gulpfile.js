const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const browsersync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

const reload = done => {
   browsersync.reload();
   done();
};

const serve = done => {
   browsersync.init({
       server: {
           baseDir: './dist/'
       },
       notify: false
   });
   done();
};

const css = () => {
   return gulp.src('./app/style/**/*.sass')
       .pipe(sass().on('error', sass.logError))
       .pipe(sourcemaps.init())
       .pipe(uglifycss())
       .pipe(rename({ basename: 'style', suffix: '.min' }))
       .pipe(autoprefixer({
            cascade: false
        }))
       .pipe(sourcemaps.write(''))
       .pipe(gulp.dest('./dist/css'));
};

const html = () => {
   return gulp.src('./app/*.html')
       .pipe(htmlmin({
           collapseWhitespace: true,
           html5: true,
           removeComments: true,
           removeEmptyAttributes: true,
           removeEmptyElements: true,
       }))
       .pipe(gulp.dest('./dist/'));
};

const js = () => {
   return gulp.src('./app/js/**/*.js')
       .pipe(concat('global.min.js'))
       .pipe(sourcemaps.init())
       .pipe(uglify())
       .pipe(sourcemaps.write(''))
       .pipe(gulp.dest('./dist/js'));
};

const watch = () => gulp.watch(['./app/style/**/*.sass', './app/js/**/*.js', './app/**/*.html'], gulp.series(js, css, html, reload));
const start = gulp.series(js, css, html, serve, watch);
const build = gulp.series(js, css, html);

exports.start = start;
exports.build = build;
exports.default = build;

