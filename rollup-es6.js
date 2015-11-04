
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');

rollup.rollup({

	entry: 'src/es6/app.js',
	plugins: [
		babel({

			exclude: 'node_modules/**',
			sourceMap: true
		})
	]

}).then(function(bundle) {

	bundle.write({

		dest: 'dest/bundle-es6.js',
		sourceMap: true
	});
})
.catch(function(reason) {
	console.log(reason);
});