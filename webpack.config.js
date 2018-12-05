const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const QiniuWebpackPlugin = require('qn-webpack');

// 配置 Plugin
const qiniuWebpackPlugin = new QiniuWebpackPlugin({
  accessKey: '七牛云个人面板 > 密钥管理 > AK',
  secretKey: '七牛云个人面板 > 密钥管理 > SK',
  bucket: '对象存储空间名',
  path: '空间内保存路径/',
  exclude: /index\.html$/ // 需要排除上传的文件
});

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './index.html'
});

module.exports = {
  // 入口文件
  entry: './src/app.js',
  // 打包出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: 'http://example.clouddn.com/空间内保存路径/' // js 被替换 CDN 路径
  },
  module: {
    rules: [{
      test: /\.(gif|png|jpe?g|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            // publicPath: 默认 `__webpack_public_path__` 为 `output.publicPath`
          }
        }, {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            }
          }
        },
      ],
    }]
  },
  // 加载插件
  plugins: [ qiniuWebpackPlugin, htmlWebpackPlugin ]
};
