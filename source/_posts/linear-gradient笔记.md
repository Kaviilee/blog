---
title: linear-gradient笔记
tag:
  - CSS
categories:
  - [CSS]
date: 2020-12-21 15:15:25
---


之前用 `background-image` 的 `linear-gradient` 画了下划线，觉得很神奇，就去认真学习了一下。做了些小笔记，备忘。

<!--more-->

## 渐变线的构成

> CSS linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于 <gradient> 数据类型，是一种特别的 <image> 数据类型。

以上是 mdn 关于 `linear-gradient` 的定义。语法如下

```css
linear-gradient(
  [ <angle> | to <side-or-corner> ,]? <color-stop-list> )
  \---------------------------------/ \----------------------------/
    Definition of the gradient line        List of color stops

where <side-or-corner> = [ left | right ] || [ top | bottom ]
  and <color-stop-list> = [ <linear-color-stop> [, <color-hint>? ]? ]#, <linear-color-stop>
  and <linear-color-stop> = <color> [ <color-stop-length> ]?
  and <color-stop-length> = [ <percentage> | <length> ]{1,2}
  and <color-hint> = [ <percentage> | <length> ] // 颜色中转点
```

这个函数表示接受**第一个参数**为是渐变的角度，它可以是单位为 `deg`，`rad`，`grad` 或 `turn` 的具体的角度值（该角度是顺时针增加的）；还可以是 `to` 和表示方向的关键词（`top`，`right`，`bottom`，`left` 这些值会被转换成 0°，90°，180°，270°，其余值会被转换成一个以顶部中央方向为起点顺时针旋转的角度），关键词先后顺序无影响，都是可选的。**第二个参数**是一系列的颜色节点，由一个 `<color>` 值组成，并且伴随一个可选的终点位置，这个终点位置可以是一个百分比值或者是沿着渐变轴的 `<length>`。

### 渐变容器

渐变图像是没有内在尺寸的，是无限大的。那么 `linear-gradient` 函数的具体尺寸由渐变容器的大小决定。

一般来说，如果给一个元素的 `background-image` 使用 `linear-gradient`，那么渐变的区域就是该元素的区域。而如果该元素设置了 `background-size` 渐变容器就会变成设置的 `background-size` 大小。

### 渐变线

> 渐变线(Gradient line)由包含渐变图形的容器的中心点和一个角度来定义的。

这里借用一下 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient()) 的图片

![linear-gradient](https://developer.mozilla.org/files/3537/linear-gradient.png)

### 渐变角度

`linear-gradient` 是通过渐变角度来控制渐变的方向的。

![渐变角度](https://i.loli.net/2020/12/21/7GzHpLmk1Q6w5s9.png)

如上图所示，红线就是渐变角度。上文中有说到，定义这个角度有两种方法：

- 使用方向关键词：`to <top | right | bottom | left | top right | top left | bottom right | bottom left>`
- 使用具体的角度值：比如 `45deg`

如果缺省角度值，默认值就是 `to bottom (180deg)` 

![default](https://i.loli.net/2020/12/21/ug8wz2qYCJiPmbS.png)

这里方向关键词有其对应的具体角度值:

`top(0deg)`，`right(90deg)`，`bottom(180deg)`，`left(270deg)`。

而如果是是使用 `to top left` 这种复合的顶角关键词，就没有对应的固定角度。因为它依赖的是渐变容器的尺寸，如果容器刚好是一个正方形，那么 `to top right` 和 `45deg` 的效果是一样。

### 渐变色节点 (linear color stop)

渐变色节点可以这样定义：

```less
<linear-color-stop> = <color> [ <percentage> | <length> ]?
```

这意味着颜色在渐变线上的位置并不需要强制提供。

如果没有提供颜色在渐变线上的位置，颜色的位置就会沿着渐变线平均分布。如果只有 2 个颜色，那么颜色 1 将被放在 `0%` 的位置，颜色 2 就被放在 `100%` 的位置；如果有 3 个颜色，那么颜色 1 在 `0%`，颜色 2 在 `50%`，颜色 3 在 `100%`，以此类推。

运用好 `linear-gradient` 可以让你的页面更好看(是真的

