---
title: webpack 常用 loaders 和 plugins
tags:
  - webpack
categories:
  - ['前端工程化']
date: 2021-03-20 21:27:36
---


记录一下 `webpack` 常用 `loaders` 和 `plugins`

<!-- more -->

## 常用 Loaders

### 加载文件

- **[raw-loader](https://github.com/webpack-contrib/raw-loader)**：把文本文件的内容加载到代码中去。
- **[file-loader](https://github.com/webpack-contrib/file-loader)**：把文本输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件。
- **[url-loader](https://github.com/webpack-contrib/url-loader)**：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去。
- **[source-map-loader](https://github.com/webpack-contrib/source-map-loader)**：加载额外的 Source Map 文件，以方便断点调试。
- **[svg-inline-loader](https://github.com/webpack-contrib/svg-inline-loader)**：把压缩后的 SVG 内容注入到代码中。
- **[node-loader](https://github.com/webpack-contrib/node-loader)**：加载 Node.js 原生模块 .node 文件。
- **[image-loader](https://github.com/tcoopman/image-webpack-loader)**：加载并且压缩图片文件。
- **[json-loader](https://github.com/webpack-contrib/json-loader)**：加载 JSON 文件。
- **[yaml-loader](https://github.com/eemeli/yaml-loader)**：加载 YAML 文件。

### 编译模板

- **[pug-loader](https://github.com/pugjs/pug-loader)**：把 Pug 模版转换成 JavaScript 函数返回。
- **[ejs-loader](https://github.com/difelice/ejs-loader)**：把 EJS 模版编译成函数返回。
- **[markdown-loader](https://github.com/peerigon/markdown-loader)**：把 Markdown 文件转换成 HTML。

### 转换脚本语言

- **[babel-loader](https://github.com/babel/babel-loader)**：把 ES6 转换成 ES5。
- **[awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader)**：把 TypeScript 转换成 JavaScript，性能要比 ts-loader 好。
- **[coffee-loader](https://github.com/webpack-contrib/coffee-loader)**：把 CoffeeScript 转换成 JavaScript。

### 转换样式文件

- **[css-loader](https://github.com/webpack-contrib/css-loader)**：加载 CSS，支持模块化、压缩、文件导入等特性。
- **[style-loader](https://github.com/webpack-contrib/style-loader)**：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- **[sass-loader](https://github.com/webpack-contrib/sass-loader)**：把 SCSS/SASS 代码转换成 CSS。
- **[postcss-loader](https://github.com/webpack-contrib/postcss-loader)**：扩展 CSS 语法，使用下一代 CSS。
- **[less-loader](https://github.com/webpack-contrib/less-loader)**：把 Less 代码转换成 CSS 代码。
- **[stylus-loader](https://github.com/webpack-contrib/stylus-loader)**：把 Stylus 代码转换成 CSS 代码。

### 检查代码

- **[eslint-loader](https://github.com/webpack-contrib/eslint-loader)**：通过 ESLint 检查 JavaScript 代码。
- **[tslint-loader](https://github.com/wbuchwalter/tslint-loader)**：通过 TSLint 检查 TypeScript 代码。
- **[mocha-loader](https://github.com/webpack-contrib/mocha-loader)**：加载 Mocha 测试用例代码。

### 其他

- **[vue-loader](https://github.com/vuejs/vue-loader)**：加载 Vue.js 单文件组件。

## 常用 Plugins

- **[commons-chunk-plugin](https://webpack.js.org/plugins/commons-chunk-plugin)**：提取公共代码，在4-11提取公共代码中有介绍。
- **[extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)**：提取 JavaScript 中的 CSS 代码到单独的文件中。
- **[prepack-webpack-plugin](https://github.com/gajus/prepack-webpack-plugin)**：通过 Facebook 的 Prepack 优化输出的 JavaScript 代码性能。
- **[uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)**：通过 UglifyES 压缩 ES6 代码。
- **[webpack-parallel-uglify-plugin](https://github.com/gdborton/webpack-parallel-uglify-plugin)**：多进程执行 UglifyJS 代码压缩，提升构建速度。
- **[happypack](https://github.com/amireh/happypack)**：多进程处理任务。
- **[ModuleConcatenationPlugin](https://webpack.js.org/plugins/module-concatenation-plugin/)**：开启 Webpack Scope Hoisting 功能。
