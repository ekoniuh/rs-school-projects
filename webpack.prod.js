const merge = require('webpack-merge');
const { EnvironmentPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackCommon = require('./webpack.common.js');

// const { PATHS } = webpackCommon.externals;
const strategy = {
  'module.rules.use': 'prepend',
};

module.exports = () => {
  const htmlPlugin = webpackCommon.plugins.find(
    (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin',
  );

  htmlPlugin.options = {
    ...htmlPlugin.options,
    ...{ minify: true },
  };

  const final = merge.smartStrategy(strategy)(webpackCommon, {
    mode: 'production',
    output: {
      filename: '[name].js',
    },
    optimization: {
      // minimizer: [new OptimizeCSSAssetsPlugin(), new TerserJSPlugin()],
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [{ loader: MiniCssExtractPlugin.loader }],
        },
      ],
    },

    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: 'development',
      }),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      // new BundleAnalyzerPlugin()
    ],
  });

  return final;
};