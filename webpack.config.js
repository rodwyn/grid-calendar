var path = require('path');
var autoprefixer = require('autoprefixer');
var SassLintPlugin = require('sass-lint-webpack');

module.exports = {
  entry: './app/scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
	      	loader: 'file-loader',
	      	options: {
	        	name: '[name].[ext]',
	        	outputPath: 'fonts/'
	      	}
				}]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/app'
  },
  plugins: [
    new SassLintPlugin({
      options: {
        files: {
          ignore: [ 'node_modules/**/*', 'app/styles/reset.scss', 'app/styles/icons.scss' ]
        }
      }
    })
  ]
};
