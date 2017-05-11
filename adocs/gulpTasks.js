/* Sass processsing and autoprefixer tasks */

import gulp from 'gulp';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';

gulp.task('sass',function(){
    gulp.src('./src/**/*.scss')
    .pipe(prefix({browsers:['last 3 versions'], cascade:false}))
    .pipe(sass().on('error', sass.logError))
    .pipe.apply(gulp.dest('./src/'));    

});

gulp.task('prefix',function(){
    gulp.src('./src/**/*.css')
    .pipe(prefix({browsers:['last 3 versions'], cascade:false}))
    .pipe.apply(gulp.dest('./src/'));    

});