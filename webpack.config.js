'use strict';

var path = require('path');
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV || 'development';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'build'),

	entry: {
		home: './home/home',
		account: './account/account',
		checkout: './checkout/checkout'
	},

	output: {
		path: __dirname + '/public',
		publicPath: './build/',
        filename: 'js/[name].js'
	},

	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', 'raw!autoprefixer?{browsers:["last 2 version", "IE 9"]}!less?resolve url')
			},

			{   test: /\.css$/,
				loader: "style-loader!css-loader"
			},

			{
				// Картинки
				test: /\.(jp?g|gif|png|svg)$/,
				exclude: /node_modules/,
				loader: 'url-loader?limit=1024&name=[path][name].[ext]?[hash]'
				// Картинки <= 1024 байта закодируются в base64
			}
		]
	},

	//watch: NODE_ENV === 'development',

	// wetchOptions: {
	// 	aggregateTimeout: 100
	// },

	plugins: [
	 	new ExtractTextPlugin('css/[name].css'),
		new webpack.ProvidePlugin({
            $: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
        }),

		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: 2
		})
	]
};
