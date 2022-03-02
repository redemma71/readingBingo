const path = require('path');

module.exports = {
   mode: 'development',
   entry: './src/app.js',
   output: {
      path: path.join(__dirname,'public'),
      filename: 'bundle.js' 
   },
   module: {
       rules: [{
           loader: 'babel-loader',
           test: /\.js$/,
           exclude: /node_modules/
        }
       ]
   },
   devtool: 'eval-cheap-module-source-map',
   devServer: {
      hot: true,
      static: {
         directory: path.join(__dirname, 'public'),
         watch: true
       },
       port: 4242
   }
};