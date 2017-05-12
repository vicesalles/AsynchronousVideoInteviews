var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('default',['prefix','sass'],function(){
    console.log('hello world');
});

gulp.task('sass',function(){
    gulp.src('./src/**/*.scss')
    .pipe(sass()).on('error',sass.logError)
    .pipe(gulp.dest('./src/'));    

});

gulp.task('prefix',function(){
    gulp.src('./src/**/*.css')
    .pipe(prefix({browsers:['last 2 versions'], cascade:false}))
    .pipe(gulp.dest('./src/'));    

});