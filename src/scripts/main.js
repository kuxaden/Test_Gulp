function styles() {
    return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe (rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}