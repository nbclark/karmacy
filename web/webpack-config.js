var path = require('path')
var webpack = require('webpack')

module.exports = [{
  context: __dirname + "/src",
  entry: './main.ts',
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
  }
},{
  context: __dirname + "/signup",
  entry: './main.ts',
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
  }
}]
