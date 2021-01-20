import { resolve } from 'path';
import 'dotenv-extended/config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { HotModuleReplacementPlugin } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default env => {
  const mode = env === 'production' ? 'production' : 'development';

  return {
    mode,
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',
        favicon: './client/favicon.ico'
      }),
      new HotModuleReplacementPlugin(),
      new CompressionPlugin()
    ],
    entry: {
      main: ['react-hot-loader/patch', './client/index.js'],
      vendor: ['lodash', 'react', '@material-ui/core']
    },
    output: {
      path: resolve(__dirname, './dist/client'),
      filename: './[name].[hash].js',
      chunkFilename: './[name].[chunkhash].js'
    },
    optimization: {
      // minimize: true,
      // minimizer: [new TerserPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          // eslint-disable-next-line unicorn/no-unsafe-regex
          test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: {
            loader: 'url-loader'
          }
        }
      ]
    },
    devServer: {
      port: process.env.WEBPACK_PORT,
      inline: true,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.PORT}`
        },
        '/auth': {
          target: `http://localhost:${process.env.PORT}`
        },
        '/ws': {
          target: `http://localhost:${process.env.PORT}`
        }
      }
    }
  };
};
