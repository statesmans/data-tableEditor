const gulp       = require('gulp');
const sass       = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const { src } = require('gulp');


gulp.task('sass-c', function() {
    return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
})

gulp.task("watch", function() {
    gulp.watch('./sass/**/*.scss', gulp.series('sass-c'))
})