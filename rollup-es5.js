

var rollup = require( 'rollup' );

rollup.rollup({

	entry: 'src/es5/app.js'

}).then( function ( bundle ) {

	bundle.write({
		//format: 'iife',
		dest: 'dest/bundle-es5.js',
		sourceMap: true
	});
})
.catch(function(reason) {
	console.log(reason);
});
