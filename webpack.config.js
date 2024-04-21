const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({ 
    template: "./src/index.html", // Source HTML
    filename: "./index.html"  // Output HTML
  }); 
module.exports = { 
    module: { 
      rules: [ 
        { 
          test: /\.js$/,  // Target all .js files
          exclude:  /node_modules /,  // Exclude the node_modules directory
          use: { 
            loader: "babel-loader", // Use babel-loader to transpile JavaScript
          } 
        } 
      ] 
    }, 
    plugins: [htmlPlugin] 
  };