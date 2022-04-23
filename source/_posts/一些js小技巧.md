---
title: 一些js小技巧
tags:
  - javascript
date: 2022-04-23 11:42:07
---


记录一些js的小技巧。

<!-- more -->

## 一些js小技巧

### 操作URL查询参数

```js
const params = new URLSearchParams(location.search); // location.search = '?key=dd&value=kk'
params.has('key'); // true
params.get('value'); // kk
```

### 取整

> 代替正数的 Math.floor()，代替负数的 Math.ceil()

```js
const num1 = ~~2.3;
const num2 = 2.3 | 0;
const num3 = 2.3 >> 0;
```

### 短路运算

```js
const a = d && 1; // 满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个真值
const b = d || 1; // 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个假值
const c = !d; // 取假赋值：单个表达式转换为true则返回false，否则返回true
```

### 判断空对象

```js
const obj = {};
const flag = !Object.keys(obj).length; // true
```

#### 满足条件时执行

```js
const flagA = true; // 条件A
const flagB = false; // 条件B
(flagA || flagB) && Func(); // 满足A或B时执行
(flagA || !flagB) && Func(); // 满足A或不满足B时执行
flagA && flagB && Func(); // 同时满足A和B时执行
flagA && !flagB && Func(); // 满足A且不满足B时执行
```

### 克隆数组

```js
const arr = [1, 2, 3];
const _arr = [...arr]; // [1, 2, 3]
```

### 合并数组

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

### 数组去重

```js
const arr = [...new Set([1, 2, 1, 4, 6, null, null])]; // [1, 2 ,4, 6, null]
```

### 过滤空值

```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean); // [1, 2]
```

### 统计成员个数

```js
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, v) => {
	t[v] = t[v] ? ++t[v] : 1;
	return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }
```

### 按属性对Object分类

```js
const people = [
    { name: 'Alice', age: 20 },
    { name: 'Max', age: 21 },
    { name: 'Tom', age: 20 }
]

const groupBy = (objectArr, property) => {
    return objectArr.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj);
        return acc;
    }, {})
}

const groupedPeople = groupBy(people, 'age');
/* {
    20: [
        { name: 'Max', age: 20 },
        { name: 'Jane', age: 20 }
    ],
    21: [{ name: 'Alice', age: 21 }]
} */
```

### 删除对象无用属性

```js
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj; // { b: 1, c: 2 }
```

