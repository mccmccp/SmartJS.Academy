var path = require("path");
module.exports ={
  //context: __dirname + "/dist",
  devtool: 'inline-source-map',
  entry: ['babel-polyfill', './src/index'],
  output: {
    //path: `${__dirname}/dist/`,
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',

  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
      {
          test: /\.html/,
          loader: 'html',
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
      },
    ],
  },
  watch: true,
  externals: {
       "jquery": "jQuery"
   },

};
