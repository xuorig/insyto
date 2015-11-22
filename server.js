import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const APP_PORT = 8080;
const GRAPHQL_PORT = 3000;

// Serve the Relay app
var compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      }
    ]
  },
  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple'),
    require('postcss-css-variables')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ],

  output: {filename: 'app.js', path: '/'}
});
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/queries': `http://localhost:${GRAPHQL_PORT}/v1`},
  publicPath: '/js/',
  stats: {colors: true}
});
// Serve static resources
app.use('/', express.static('public'));
app.use('/node_modules/react', express.static('node_modules/react'));
app.use('/node_modules/react-dom', express.static('node_modules/react-dom'));
app.use('/node_modules/react-relay', express.static('node_modules/react-relay'));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
