var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs');

gulp.task('sass', function(){ // create task
  return gulp.src(['app/sass/**/*.sass', 'app/sass/**/*.scss']) // get src
    .pipe(sass({outoutStyle: 'expanded'}).on('error', sass.logError)) // conver sass in css outoutStyle:nested|compact|expanded|compressed
    .pipe(gulp.dest('app/css')) // unloading in folder css
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
  return gulp.src([
      'app/libs/jquery/dist/jquery.min.js'
    ])
  .pipe(concat('libs.min.js')
  .pipe(uglify())
  .pipe(gulp.dest('app/js')))
});

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
});

gulp.task('watch', ['browser-sync', 'sass'], function(){
  gulp.watch(['app/sass/**/*.sass', 'app/sass/**/*.scss'], ['sass']); // watch file sass
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
});
