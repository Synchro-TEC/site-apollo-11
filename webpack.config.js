const webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var path = require('path');

const ENV = process.env.NODE_ENV || 'development';

var VERSION = JSON.stringify(require('./package.json').version).replace(/["']/g, '');

module.exports = env => {

  console.log(`|******************* NODE_ENV: ${ENV.toUpperCase()} #### VERSION: ${VERSION} ***********************************|`);

  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);
  return {
    entry: {
      application: './src/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'application.web.js',
    },
    // context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    devServer: {
      inline: true,
      contentBase: './dist',
    },
    resolve: {
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      },
    },
    module: {
      loaders: [
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react']} },
        { test: /\.css$/,  loader: 'style!css' },
      ],
    },
    plugins: removeEmpty([
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false,
        },
      })),
      ifProd(new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$/,
        threshold: 10240,
        minRatio: 0.8,
      })),
    ]),
  }
};
