
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

rollup.rollup({

	entry: 'src/jsx/app.js'
	//,modules: "amd"
	,plugins: [
		babel({
			//modules: "amd", // - amd, common, system, umd
			modules: "common",
			//stage: 0,
			exclude: 'node_modules/**',
			sourceMap: true
		})
	]

}).then(function(bundle) {

	bundle.write({

		dest: 'dest/bundle-test.js',
		sourceMap: true
	});
})
.catch(function(reason) {
	console.log(reason);
});