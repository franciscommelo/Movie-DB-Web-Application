const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	mode: 'development',
	entry: './javascript/index.js',

	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html' 
		})
	],

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(gif|png|jpe?g)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {
					  name: '[name].[ext]',
					  outputPath: 'assets/images/'
					}
				  }
				]
			  },
			{
				test: /\.(hbs)$/,
				use: {
				  loader: 'raw-loader',
				  options: {
					esModule: false,
				  
				}
			}
		},
			{
				test: /\.(html)$/,
				use: 'html-loader'
			}
		]
	}
}
