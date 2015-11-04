var gulp = require("gulp");
var gulpUtil = require("gulp-util");

var gulpFilter = require("gulp-filter");
var gulpSourcemaps = require("gulp-sourcemaps");
var gulpBabel = require("gulp-babel");

var gulpUglify = require("gulp-uglify");

var del = require("del");

var rollup = require("rollup");
var rollupBabel = require("./mods/rollup-babel");

function clean (done) {
	del("./dest"); //.then(done)
}

function babelTest() {

	var jsFilter = gulpFilter("**/*.{js,jsx}");

	gulp.src("src/jsx/**/*")

			//.pipe(jsFilter)
			.pipe(gulpSourcemaps.init())
			.pipe(gulpBabel({
				presets: ['react', "es2015"]
				//,modules: "system"
			}))
			.pipe(gulpSourcemaps.write("."))

			.pipe(gulp.dest("src/babel"))

			.on('error', (err) => console.log("Error: ", err))
			.on('end', () => { console.log("complete!"); });


}


function rollItUp() {

	rollup.rollup({

		entry: "src/jsx/app.js",
		//external:["!react"],
		plugins: [
			rollupBabel({
				exclude: "node_modules/**",
				sourceMap: true,
				presets: ['react']
			})
		]

	}).then(function(bundle) {

		//var result = bundle.generate({
		//	// output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
		//	format: 'cjs'
		//});

		bundle.write({

			format: 'cjs',
			dest: "dest/bundle-rollup.js",
			sourceMap: true

		}).then(function() {
			console.log("COMPLETE!!!!");

		});
	})
	.catch(function(reason) {
		console.log(reason);
	});

}

function uglify() {
	gulp.src(["dest/bundle-jsx.js"])
			//.pipe(uglify())
			.pipe(gulp.dest('mmmm'))
			.on('error', gulpUtil.log)
			.on('end', () => {
				console.log("done!");
			});
}



gulp.task("clean", clean);
gulp.task("babel", babelTest);
gulp.task("rollup", rollItUp);
gulp.task("uglify", uglify);

