var gulp   =  require('gulp'),
	  concat =  require('gulp-concat'),
    less   =  require('gulp-less'),
    path   =  require('path'),
	  watch  =  require('gulp-watch'),
		rigger =  require('gulp-rigger'),
		cleanCSS = require('gulp-clean-css'),
		imagemin = require('gulp-imagemin'),
		uglify   = require('gulp-uglify'),
		pump     = require('pump'),
		autoprefixer = require('gulp-autoprefixer');

/* -----------------------------------development----------------------------------------- */
/* обьединение скриптов в один файл*/
gulp.task('dev-script', function() {
  return gulp.src('./dev/js/*.js')
    .pipe(concat('common.js'))
    .pipe(gulp.dest('./dev/dist/'));
});

/* less to css */
gulp.task('dev-less', function () {
    return gulp.src('./dev/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dev/css'));
});

/* gulp watch*/
gulp.task('dev-watch', function () {
		watch('./dev/*.less', function(event, cb) {
				gulp.start('dev-less');
		});
		watch('./dev/js/common.js', function(event, cb) {
				gulp.start('dev-script');
		});

});

/* -----------------------------------production------------------------------------------ */
/* перенос всех библиотек */
gulp.task('move-css', function() {
  return gulp.src('./dev/lib/**')
    .pipe(gulp.dest('./prod/lib'));
});

/*минификация css*/
gulp.task('minify-css', function() {
  return gulp.src('./dev/css/*.css')
		.pipe(autoprefixer({
					browsers: ['last 10 versions'],
					cascade: false
			}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./prod/css'));
});

/* перенос всех библиотек */
gulp.task('move-lib', function() {
  return gulp.src('./dev/lib/**')
    .pipe(gulp.dest('./prod/lib'));
});


/* перенос всех шрифтов */
gulp.task('move-fonts', function() {
  return gulp.src('./dev/fonts/**')
    .pipe(gulp.dest('./prod/fonts'));
});


/* перенос всех html */
gulp.task('move-html', function() {
  return gulp.src('./dev/*.html')
    .pipe(gulp.dest('./prod'));
});


/* сжатие картинок - с параметрами */
gulp.task('minify-img', function() {
    gulp.src('./dev/img/**')
				.pipe(imagemin([
				imagemin.gifsicle({interlaced: true}),
				imagemin.jpegtran({progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({plugins: [{removeViewBox: true}]})
				]))
        .pipe(gulp.dest('./prod/img/'))
});

/* сжатие скриптов */
gulp.task('minify-js', function (cb) {
  pump([
        gulp.src('./dev/js/*'),
        uglify(),
        gulp.dest('./prod/js/')
    ],
    cb
  );
});

/* finish !*/
gulp.task('prod', function () {
	gulp.start('move-html');
	gulp.start('move-lib');
	gulp.start('move-fonts');
	gulp.start('minify-js');
	gulp.start('minify-img');
	gulp.start('minify-css');
});
