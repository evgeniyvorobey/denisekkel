var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var mmq = require('gulp-merge-media-queries');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
//var imagemin = require('gulp-imagemin');

gulp.task('html',function(){
	return gulp.src('./src/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
			}));
});
gulp.task('json',function(){
	return gulp.src('./src/**/*.json')
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.reload({
		stream: true
		}));
})
gulp.task('js',function(){
	return gulp.src('./src/**/*.js')
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
			}));
});

gulp.task('php', function(){
	return gulp.src('./src/**/*.php')
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
			}));
});

gulp.task('css', function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(mmq({
      	log: false
    	}))
        //.pipe(cssnano())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
			}));
});

gulp.task('img', function(){
	return gulp.src('./src/img/**/*.+(png|jpg|gif|svg)')
//		.pipe(imagemin())
		.pipe(gulp.dest('./dist/img'))
});

gulp.task('fonts',function(){
	return gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./dist/fonts'))
});

gulp.task('del:dist',function(){
	return del.sync('./dist')
});


gulp.task('watch',function(){
	gulp.watch('./src/*.html',['html']);
	gulp.watch('./src/scss/*.scss',['css']);
	gulp.watch('./src/**/*.json',['json']);
	gulp.watch('./src/**/*.js',['js']);
	gulp.watch('./src/img/**/*.+(png|jpg|gif|svg)',['img']);
	gulp.watch('./src/fonts/**/*.*')
	gulp.watch('./src/**/*.php',['php'])
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});
gulp.task('build',['js','json','html','css','img','fonts','php'])

gulp.task('start', ['del:dist','build','server','watch']);