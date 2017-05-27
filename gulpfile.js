var gulp =require("gulp");//创建 gulp模块
var uglify=require("gulp-uglify");//创建js混淆压缩 模块
var minify_css =require("gulp-minify-css");　//创建 css混淆压缩模块
var gulp_concat = require('gulp-concat');  //创建 文件合并模块
var cssver = require('gulp-make-css-url-version'); 
var rename = require("gulp-rename");  //重命名模块
var sass = require('gulp-sass');  //便宜sass模块

//压缩css
gulp.task('min-css', function(){
	gulp.src('./src/css/*.css') 
	.pipe(cssver())
	.pipe(minify_css())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css/'));
});

//压缩js
gulp.task('min-js', function(){
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/js/'))
});

//编译sass
gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});


//监听事件
gulp.task('watch', function () {
  gulp.watch('./src/sass/*.scss', ['sass']);  //监听scss
});

gulp.task('default',['min-js','min-css']);
