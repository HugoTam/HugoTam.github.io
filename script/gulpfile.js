/**
 * Created by hugotam on 16/2/20.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    react = require('gulp-react');

var JSXSRC = [
    "./components/header.js",
    "./components/blog.js",
    "./components/blogContent.js",
    "./components/meContent.js",
    "./components/expContent.js",
    "./components/main.js"
]

gulp.task('jsx', function(){
    gulp.src(JSXSRC)
        .pipe(concat("components.js"))
        .pipe(react())
        .pipe(gulp.dest('./'));
});