---
title: 关于Antd框架下Cascader动态加载选项的问题
date: 2021-01-13 18:07:43
tags:
---


近日在使用 Ant Design 的 Cascader 初始化传值遇到的问题，记录一下。

<!--more-->

## 问题描述

在使用 Cascader 组件的动态加载数据时，由于需要传入初始值来初始化当前的选择，但是此时组件内并不存在对应的数据。
假设我们使用 `id`，一个 `number` 字段来作为 Cascader 的 value 值，那么如果贸然传入数字类型的数组，就会出现初始化不正常的问题。

## 解决方案
既然不能简单的传入数字类型的数组来初始化组件，那么我们可以传入对象数组或者是字符串数组来初始化组件。

具体的代码就不在此展示了

具体可以查看 [动态加载选项初始化组件](https://codesandbox.io/s/dongtaijiazaixuanxiang-antd4102-forked-whwnc)
