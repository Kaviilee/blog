---
title: 使用background-image画虚线
date: 2020-12-14 14:54:50
tags:
categories:
  - [CSS]
---


在知道可以用 `background-image` 的渐变来定义虚线之前我都是用 `border-bottom: 1px dashed #ccc` 的。是新的知识，耶！

<!-- more -->

```html
<div class="container"> 
    <div class="item">background-image</div>
</div>
```

## 传统的 border

```less
.container {
    position: relative;
    
    .item {
        padding: 16px;
        border-bottom: 1px solid #ccc;
    }
}
```
使用 border 的效果如下

![border-bottom.png](https://i.loli.net/2020/12/14/dHDhBA2OSG7cy9u.png)



## 使用 background-image

```less
.container {
    position: relative;
    
    .item {
        padding: 16px;
        
        &::after {
            position: absolute;
            content: '';
            width: 100%;
            height: 1px;
            left: 0;
            bottom: 0;
            // important
            background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
            // 设置图片宽度与高度
            background-size: 20px 1px;
            background-repeat: repeat-x;
        }
    }
}
```

![background-image.png](https://i.loli.net/2020/12/14/mqUpH1GbIjc54Ru.png)

使用 `background-image` 就可以通过改变 `background-size` 来改变虚线的间距。

如果要改变虚线的方向，需要修改 width，height，background-image， background-repeat 和 background-size。

```less
&::after {
	width: 1px;
    height: 100%;
    background-image: linear-gradient(to bottom, #ccc 0%, #ccc 50%, transparent 50%);
    background-repeat: repeat-y;
    background-size: 1px 10px;
}
```

