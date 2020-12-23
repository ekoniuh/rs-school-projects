const path = require('path');
const miniSvgDataUri = require('mini-svg-data-uri');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assetsImage: path.join(__dirname, '.covid-dashboard/src/assets/images'),
  // assetsAudio: path.join(__dirname, '.covid-dashboard/src/assets/audio'),
  public: path.join(__dirname, 'public'),
};

module.exports = {
  externals: {
    PATHS,
  },
  entry: '.covid-dashboard/src/app/index.js',
  output: {
    filename: 'index.js',
    path: PATHS.dist,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '.covid-dashboard/src/assets/images/[name].[ext]' },
          },
        ],
      },
      // {
      //   test: /\.(mp3)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: { name: '.covid-dashboard/src/assets/audio/[name].[ext]' },
      //     },
      //   ],
      // },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'covid-dashboard	',
      template: '.covid-dashboard/src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: PATHS.assetsImage, to: 'assets/images' },
        // { from: PATHS.assetsAudio, to: 'assets/audio' },
      ],
    }),
  ],
};
