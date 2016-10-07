"use strict";

var babelify = require('babelify'),
	browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
	coffeeify = require('coffeeify'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	livereload = require('gulp-livereload'),
	merge = require('merge'),
	rename = require('gulp-rename'),
	source = require('vinyl-source-stream'),
	sourceMaps = require('gulp-sourcemaps'),
	watchify = require('watchify');

var config = {
	js: {
		src: './main.js',
		outputDir: './build/',
		mapDir: './maps',
		outputFile: 'bundle.js'
	}
};

function bundle (bundler) {
	bundler
		.bundle()
		.pipe(source(config.js.src))
		.pipe(buffer())
		.pipe(rename(config.js.outputFile))

		.pipe(sourceMaps.init({ loadMaps: true }))
		.pipe(sourceMaps.write(config.js.mapDir))

		.pipe(gulp.dest(config.js.outputDir))
		.pipe(livereload());
}

gulp.task('bundle', function() {
	var bundler = browserify(config.js.src)
						.transform(coffeeify)
						.transform(babelify, { presets: ['es2015'] });
	bundle(bundler);
})