var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixerOptions = {
  browsers: [
    'last 2 versions',
    'iOS >= 7',
    'Android >= 4',
    'Explorer >= 10',
    'ExplorerMobile >= 11'
  ],
  cascade: false
}

module.exports = {
  entry: [
    "es6-shim",
    "reflect-metadata",
    "web-animations.min",
    "moment",
    "zone.js",
    path.join(__dirname, 'www', 'app', 'app.js')
  ],
  output: {
    path: path.join(__dirname, 'www', 'build'),
    filename: 'js/app.bundle.js',
    //pathinfo: true // show module paths in the bundle, handy for debugging
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "awesome-typescript-loader?doTypeCheck=false&useWebpackText=true",
        include: [path.join(__dirname, 'www')],
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        include: [path.join(__dirname, 'www')],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", ["css", "autoprefixer?" + JSON.stringify(autoprefixerOptions), "sass"])
      },
      // Any png-image or woff-font below or equal to 100K will be converted
      // to inline base64 instead
      { test: /\.(png|woff|ttf)(\?.*)?$/, loader: 'url-loader?limit=1000000' }
    ]
  },
  resolve: {
    modulesDirectories: [
      "node_modules",
      "node_modules/ionic-framework/node_modules", // angular is a dependency of ionic
      "node_modules/ionic-framework/dist/js", // for web-animations polyfill
      "node_modules/ionic-framework/dist/src/es5/common" // ionic-framework npm package
    ],
    extensions: ["", ".js", ".ts"]
  },
  plugins: [
    // pulls out all Sass dependencies into one app.css file
    new ExtractTextPlugin("css/app.css")
  ],
  // Sass loader configuration to tell webpack where to find the additional SASS files
  // it needs for `ionic`, located in the ionic-framework node module folder.
  // https://github.com/jtangelder/sass-loader#sass-options
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "node_modules", 'ionic-framework', 'dist', 'src', 'scss')
    ]
  }
};
