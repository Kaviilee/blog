---
title: js获取视口和文档高度
date: 2019-09-07 17:25:18
author:
    name: Kaviilee
    avatar: https://cdn.jsdelivr.net/gh/Kaviilee/cdn@1.1/blog/images/custom/papalymo.jpg
categories:
    - [JavaScript]
tags:
---

js获取视口和文档高度

<!-- more -->

#### js获取视口和文档高度

项目 | 内容
:------------: | :-------------:
clientHeight | content area + padding 
offsetHeight | border + content area + padding 
scrollHeight | 没有滚动条（内容展开时）的高度

> body和html分别表示document.body和document.documentElement

html.clientHeight 返回视口高度
html.offsetHeight 返回 <html> 元素的高度，在没有给 <html> 元素设置height时，可以理解为文档高度。***ie6-8返回视口高度***
html.scrollHeight    总是返回文档高度。***在 firefox，opera，ie8 中，返回文档高度和视口高度中较大的那个***
body.clientHeight和body.offsetHeight    返回<body>元素的高度（近似于文档高度），如果 <body> 设置 height，则返回设定的值（ie6 仍然返回<body> 内元素的总高度）。
body.scrollHeight    总是返回文档高度。***在 webkit 中，返回文档高度和视口高度中较大的那个。***

总之，获取视口高度用 html.clientHeight ,IE6-8 还可以用 html.offsetHeight。获取文档高度可以用 html.scrollHeight 或 body.scrollHeight。

另外，​​现代浏览器中还有一个属性 window.innerHeight 可以用来获取视口高度，IE9+ 才开始支持。得到的高度有时候会多十几个像素，innerHeight 把滚动条的高度也计算在内。

```javascript
// 获取视口高度
let viewportH = window.innerHeight || document.documentElement.clientHeight;

// 获取文档高度
let docH = document.body.scrollHeight;
// 或者
let docH = document.documentElement.scrollHeight
```
