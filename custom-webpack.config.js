console.log('The custom config is used!');

module.exports = {
	resolve: {
		fallback: {
			"http": require.resolve("stream-http"),
			"https": require.resolve("https-browserify"),
			"timers": require.resolve("timers-browserify"),
			"path": require.resolve("path-browserify"),
			"os": require.resolve("os-browserify/browser")
		},
	},
	node: { global: true }
}