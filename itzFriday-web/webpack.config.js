var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'inline-source-map',
	entry: ['./client/client'],
	output: {
		path: path.resolve('./client/assets/'),
		filename: 'bundle.js',
		publicPath: '/' 
	},
	plugins: [
    	new webpack.optimize.DedupePlugin(),
    	new webpack.optimize.UglifyJsPlugin({
      		minimize: true,
      		compress: {
        		warnings: false
      		}
    	}),
    	new webpack.DefinePlugin({
      		'process.env': {
        	'NODE_ENV': JSON.stringify('production')
      		}
    	})
  	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-1', 'react']
				}
			},
			{
  				test: /\.css$/,
  				loader: 'style!css?modules',
  				include: /flexboxgrid/
			}
		]
	},
	resolve: {
		extensions: ['.js','.jsx', 'index.js', 'index', '']
	}
}