module.exports = {
  entry: './src/ReactRunner.js',
  output: {
      filename: 'bundle.js',
      publicPath: 'http://localhost:8090/assets'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  externals: {
      'react': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
