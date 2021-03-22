---
title: 修改 console.log 的颜色
tags:
  - 其他
date: 2021-03-22 16:49:05
---



今日用 node 写一个小工具的时候，想要 `console` 输出不一样的颜色，又不想而外引入工具库，遂查找资料，记录一下。

<!-- more -->

## 不使用库

```shell
console.log(fg, bg, content, "\x1b[0m");
```

这里 `fg` 其实就是字体颜色，`bg` 对应背景颜色，`content` 就是要输出的内容

以下列出其他的颜色

```
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
```

`Fgxx` 对应的是字体颜色，`Bgxx` 对应的是背景颜色。

当然我们可以封装一下，使调用更加便捷一点

```js
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
    
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  }
}
```


## 使用库

修改 console 颜色的库有
- [chalk](https://github.com/chalk/chalk)
- [colors](https://github.com/Marak/colors.js)
- [cli-color](https://github.com/medikoo/cli-color)


## 碎碎念

好看的 `console.log` 可以让写代码的我快乐(๑•̀ㅂ•́)و✧
