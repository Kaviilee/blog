---
title: webpack优化浅谈
date: 2021-03-21 14:23:10
tags:
  - webpack
categories:
  - ['前端工程化']
---

一谈起 `webpack`，难免就会谈起如何进行 `webpack 优化`。

<!-- more -->

## 缩小文件检索范围

webpack 启动之后会从入口 `entry` 出发，解析文件中的导入语句，再递归的解析。在遇到导入语句时，webpack 会做两件事:

> 1. 根据导入语句去寻找对应要导入的文件。
> 2. 根据找到的导入文件的后缀，使用对应的 `loader` 去处理文件。

所以优化的时候，可以通过尽量减少以上两件事的发生，来提高速度。

### 优化 loader 配置

由于 loader 对文件的处理是十分耗时的，那就尽量减少要被 loader 处理的文件。
此时可以通过使用 `include` 配置来减少文件数。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
}
```

### 优化 resolve.modules 配置

`resolve.modules` 用于配置 webpack 去哪些目录寻找第三方模块。

`resolve.modules` 的默认值是 `['node_modules']`，就是说先去当前目录下的 `./node_modules` 目录查找模块，如果没有查找到就去上一级的 `../node_modules` 查找，再没找到再去上一级，以及类推。

当明确知道第三方模块就是安装在根目录下的 `node_modules` 时，就可以通过直接指定第三方模块的绝对路径来减少查找时间。

```js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  }
}
```

### 优化 resolve.alias 配置

`resolve.alias` 配置通过别名把原导入路径映射成一个新的导入路径。
