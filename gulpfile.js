var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
      .pipe(sass()) // Converts Sass to CSS with gulp-sass
      .pipe(gulp.dest('src/css'))
  });


  gulp.task('minify-css', ['sass'], function () {
    gulp.src('src/css/styles.css') // path to your file
        .pipe(minifyCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/'));
});


  gulp.task('watch', ['sass', 'minify-css'], function(){
    gulp.watch('src/scss/*.scss', ['sass', 'minify-css']); 
  });

  gulp.task('build', ['sass', 'minify-css']);