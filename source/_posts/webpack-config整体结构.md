---
title: webpack.config 整体结构
tags:
  - webpack
date: 2021-03-20 17:26:19
---

记录一下 `webpack` 配置对应的意义，便于自己查阅~

<!-- more -->

```javascript
const path = require('path')
module.exports = {
    // entry 表示入口，webpack 执行构建的第一步从 entry 开始
    // 类型可以是 String | Object | Array
    entry: 'index.js', // 只有一个入口, 入口只有一个文件
    entry: ['index1.js', 'index2.js'], // 只有一个入口，入口有2个文件
    entry: { // 有两个入口
      a: 'indexA.js',
      b: ['indexB1.js', 'indexB2.js']
    },
    
    // 如何输出结果：在 webpack 的一系列处理之后，如何输出最终的代码
    output: {
        // 输出文件的存放目录，必须是 String 类型的绝对路径
        path: path.resolve(__dirname, 'dist'),
        
        // 输出文件的名称
        filename: 'bundle.js', // 完整的名称
        // 当配置了多个 entry 时，通过名称模板为不同的 entry 生成不同的文件名称
        filename: '[name].js',
        // 根据文件内容 hash 值生成文件名称，用于浏览器长时间缓存文件
        filename: '[chunkhash].js',
        
        // 发布到线上的所有资源的 URL 前缀，String 类型
        publicPath: '/public', // 放到指定目录下
        publicPath: '', // 放到当前目录下
        publicPath: 'https://cdn.jsdelivr.net/', // 放到 CDN 上
        
        // 导出库的名称 String 类型
        // 缺省时，默认输出格式是匿名的立即执行函数
        library: 'MyLibrary',

        // 导出库的类型，枚举类型 默认是 var
        // 可以是 umd | umd2 | commonjs2 | commonjs | amd | this | var | assign
        // | global | jsonp
        libraryTarget: 'umd',

        // 是否包含有用的文件路径信息到生成的代码中 Boolean 类型
        pathinfo: true,

        // 附加 Chunk 的文件名称
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',

        // JSONP 异步加载资源时的回调函数名称，需要和服务端配合使用
        jsonpFunction: 'webpackJsonp',

        // 生成的 Source Map 文件名称
        sourceMapFilename: '[file].map',

        // 浏览器开发者工具里显示的源码模块名称
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',

        // 异步加载跨域的资源时使用的方式
        crossOriginLoading: 'use-credentials',
        crossOriginLoading: 'anonymous',
        crossOriginLoading: false,
    },
    
    // 配置模块相关
    module: {
      rules: [ // loader 配置
        {
          test: /\.jsx?$/, // 正则匹配命中要使用 loader 的文件
          include: [ // 只会名字这里的文件
            path.resolve(__dirname, 'src'),
          ],
          exclude: [ // 忽略这里的文件
            /node_modules/
          ],
          use: [ // 使用哪些 loader，从右到左，从后到前执行
            'style-loader',
            {
              loader: 'css-loader',
              options: {}
            }
          ]
        }
      ],
      noParse: [ // 不用解析和处理的模块
        /special-library\.js$/ // 正则匹配
      ]
    },

    // 配置插件
    plugins: {},

    // 配置寻找模块的规则
    resolve: {
      modules: [ // 寻找模块的根目录，Array 类型，默认根目录为 node_modules
        'node_modules',
        path.resolve(__dirname, 'src')
      ],
      extensions: ['.js', 'json', 'jsx', '.css'], // 模块的后缀名
      alias: { // 模块别名配置，用于映射模块
        // 把 '@' 映射为 'src'，'@/index'会被映射为 'src/index'
        '@': path.resolve(__dirname, 'src'),
        // 使用结尾符号 $ 后，把 'only-module' 映射为 'new-module'
        // 但不会把 'only-module/index' 映射为 'new-module/index'
        'only-module$': 'new-module'
      },
      alias: [ // 支持数组来配置
        {
          name: 'module', // 老的模块
          alias: 'new-module', // 新的模块
          // 是否只映射模块，对应上面是否有 $
          onlyModule: true
        }
      ],
      symlinks: true, // 是否跟随文件软链接去搜寻模块的路径
      descriptionFiles: ['package.json'], // 模块的描述文件
      mainFields: ['main'], // 模块的描述文件里的描述入口的文件的字段
      enforceExtension: false, // 是否强制导入语句必须要写明文件后缀
    },

    // 输出文件性能检查配置
    performance: {
      hints: 'warning', // 有性能问题时输出 'warning' 警告 'error' 错误 false 关闭
      maxAssetSize: 200000, // 最大文件大小 bytes
      maxEntrypointSize: 400000, // 最大入口文件大小 bytes
      assetFilter: function(assetFilename) {
        return assetFilename.endWith('.css') || assetFilename.endWith('.js')
      }
    },

    devtool: 'source-map', // 配置 source-map 类型

    context: __dirname, // webpack 使用的根目录，String 类型 必须是绝对路径

    // 配置输出代码的运行环境
    
    target: 'web', // 浏览器，默认
    target: 'webworker', // WebWorker
    target: 'node', // Node.js，使用 `require` 语句加载 Chunk 代码
    target: 'async-node', // Node.js，异步加载 Chunk 代码
    target: 'node-webkit', // nw.js
    target: 'electron-main', // electron, 主线程
    target: 'electron-renderer', // electron, 渲染线程

    // 使用来自 JavaScript 运行环境提供的全局编写
    externals: {
      jquery: 'jQuery'
    },

    // 控制台输出日志控制
    stats: {
      assets: true,
      colors: true,
      errors: true,
      errorDetails: true,
      hash: true,
    },

    // DevServer 相关配置
    devServer: {
      proxy: { // 代理到后端服务接口
        '/api': 'http://localhost:3000'
      },
      // 配置 DevServer HTTP 服务器的文件目录
      contentBase: path.join(__dirname, 'public'),
      compress: true, // 是否开启 gzip 压缩
      historyApiFallback: true, // 是否开发 HTML5 History API 网页
      hot: true, // 是否开启模块热替换功能
      https: false, // 是否开启 HTTPS 模式
    },

    profile: true, // 是否捕捉 Webpack 构建的性能信息，用于分析什么原因导致构建性能不佳
    cache: false, // 是否开启缓存提升构建速度

    watch: true, // 是否开启监听模式
    watchOptions: { // 监听模式选项
      // 不监听的文件或文件夹，支持正则，默认为空
      ignored: /node_modules/,

      // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
      // 默认为300ms 
      aggregateTimeout: 300,
      // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每隔1000毫秒询问一次
      poll: 1000
    }
}
```

