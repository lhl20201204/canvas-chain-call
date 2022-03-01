const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
      path: resolve(__dirname, 'index.js')
  },
  output: {
      path: resolve(__dirname, 'bundle/index.js')
  },
  module: {
      rules: [
        {
            test: /.js$/,
            use:['babel-loader']
        }
      ]
  },
  plugins: [
      new HTMLWebpackPlugin({
          template: resolve(__dirname, 'public/index.html')
      })
  ],
  devServer: {
      port:5555
  }
}