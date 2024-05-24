const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
  },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Source HTML
            filename: './index.html'  // Output HTML
        }),
    ],
    devServer: { // devServer configuration for Webpack
        // This sets the directory from which static files will be served.    
        static: path.join(__dirname, 'dist'), // 'dist' is the directory where the built files are typically placed.
        port: 8080,
    },
};
