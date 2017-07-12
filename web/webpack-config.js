var path = require('path')
var webpack = require('webpack')

module.exports = [{
  context: __dirname + "/src",
  entry: './main',
  output: { path: __dirname, filename: '../server/dist/scripts/bundle.js' },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.tsx$/,
    //     loader: 'eslint-loader'
    //   }
    // ],
    loaders: [
      {
        test: /\.ts(x|$)$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  }
}, {
  context: __dirname + "/signup",
  entry: './main',
  output: { path: __dirname, filename: '../server/dist/scripts/signup.js' },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.tsx$/,
    //     loader: 'eslint-loader'
    //   }
    // ],
    loaders: [
      {
        test: /\.ts(x|$)$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
  }
}]
