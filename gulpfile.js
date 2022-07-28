const gulp = require('gulp')
const del = require('del')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const paths = {
    styles: {
        src: ['src/styles/**/*.sass', 'src/styles/**/*.scss'],
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}
// Очистка каталога dist;
function clean(){
    return del(['dist'])
}
// Обработка файла стилей;
function styles() {
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) 
    .pipe(cleanCSS())
    .pipe (rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
}
// обработка скриптов;
function scripts(){
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}




// отслеживает изменения в стилях;
function watch(){
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build