---
title: JavaScript类型转换
date: 2020-09-09 23:23:10
categories:
    - [JavaScript]
tags:
---

关于 JavaScript 类型转换的一些笔记。

<!-- more -->


## 前言

将值从一种类型转换到另一种类型通常称为类型转换。

## 原始值转布尔值

JavaScript中，只有 6 种值可以被转换为false，其余都会被转换成 true。

```javascript
console.log(Boolean()) // false

console.log(Boolean(false)) // false

console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean("")) // false
```



## 原始值转数字

使用 `Number` 函数将值的类型转换成数字类型。

根据规范，如果有参数，则调用 `ToNumber(value)` 计算出值返回，否则返回 +0。

此处的 `ToNumber` 表示的是一个底层规范上实现的方法，并没有暴露出来。

|  值类型   |                  结果                   |
| :-------: | :-------------------------------------: |
| Undefined |                   NaN                   |
|   Null    |                   +0                    |
|  Boolean  | 如果是 true，返回1；如果是 false，返回0 |
|  Number   |            返回与之相等的值             |
|  String   |                  如下                   |


```javascript
console.log(Number()) // +0

console.log(Number(undefined)) // NaN
console.log(Number(null)) // +0

console.log(Number(false)) // +0
console.log(Number(true)) // 1

console.log(Number("123")) // 123
console.log(Number("-123")) // -123
console.log(Number("1.2")) // 1.2
console.log(Number("000123")) // 123
console.log(Number("-000123")) // -123

console.log(Number("0x11")) // 17

console.log(Number("")) // 0
console.log(Number(" ")) // 0

console.log(Number("123 123")) // NaN
console.log(Number("foo")) // NaN
console.log(Number("100a")) // NaN
```



## 原始值转字符

使用 `String` 函数将值的类型转换成字符类型。

根据规范，如果函数有参数，则调用 `ToString(value)` 计算出值返回，否则返回空字符串。

|  值类型   |                         结果                         |
| :-------: | :--------------------------------------------------: |
| Undefined |                     'undefined'                      |
|   Null    |                        'null'                        |
|  Boolean  | 如果是 true，返回 "true"；如果是 false，返回 "false" |
|  String   |                   返回与之相等的值                   |
|  Number   |                         如下                         |

```javascript
console.log(String()) // 空字符串

console.log(String(undefined)) // undefined
console.log(String(null)) // null

console.log(String(false)) // false
console.log(String(true)) // true

console.log(String(0)) // 0
console.log(String(-0)) // 0
console.log(String(NaN)) // NaN
console.log(String(Infinity)) // Infinity
console.log(String(-Infinity)) // -Infinity
console.log(String(1)) // 1
```

## 原始值转对象

原始值通过调用 String()、Number() 或者 Boolean() 构造函数就能转化为各自的包装对象。

null 和 undefined，当将它们用在期望是一个对象的地方都会造成一个类型错误 (TypeError) 异常，而不会执行正常的转换。

## 对象转布尔值

所有对象转为布尔值都为 true。

## 对象转字符串和数字

对象转换到字符串或者数字都是调用待转换对象的一个方法来实现的。主要有两个方法 `toString()` 和 `valueOf()`。

所有对象除了 null 和 undefined 之外的任何值都有 `toString` 方法，通常，它和 String 方法的返回值是一致的。

JavaScript 根据不同的类各自的特点，定义了更多版本的 `toString` 方法。

```javascript
console.log(({}).toString()) // [object Object]

console.log([].toString()) // ""
console.log([0].toString()) // 0
console.log([1, 2, 3].toString()) // 1,2,3
console.log((function(){var a = 1;}).toString()) // function (){var a = 1;}
console.log((/\d+/g).toString()) // /\d+/g
console.log((new Date(2010, 0, 1)).toString()) // Fri Jan 01 2010 00:00:00 GMT+0800 (CST)
```

另一个转换对象的方法是 `valueOf`，表示对象的原始值。默认的 `valueOf` 方法返回这个对象本身。日期是个例外，它会返回它的一个内容表示：1970 年 1 月 1日以来的毫秒数。

```javascript
var date = new Date(2020, 9, 6);
console.log(date.valueOf()) // 1601913600000
```

### 对象转字符串

| 值类型 |                             结果                             |
| :----: | :----------------------------------------------------------: |
| Object | 1. primValue = ToPrimitive(input, Number)<br/>2. 返回 ToString(primValue)。 |

### 对象转数字

| 参数类型 |                             结果                             |
| :------: | :----------------------------------------------------------: |
|  Object  | 1. primValue = ToPrimitive(input, Number)<br/>2. 返回 ToNumber(primValue)。 |

```javascript
console.log(Number({})) // NaN
console.log(Number({a : 1})) // NaN

console.log(Number([])) // 0
console.log(Number([0])) // 0
console.log(Number([1, 2, 3])) // NaN
console.log(Number(function(){var a = 1;})) // NaN
console.log(Number(/\d+/g)) // NaN
console.log(Number(new Date(2010, 0, 1))) // 1262275200000
console.log(Number(new Error('a'))) // NaN
```

`Number([])` 时，先调用了 `[]` 的 `valueOf` 方法返回了 `[]` ，因为不是原始值，继续调用 `toString` 方法，返回空字符串，继续调用 `ToNumber`，空字符串返回 0。

`Number([1,2,3])` 时，先调用了 `[1, 2, 3]` 的 `valueOf` 方法返回了 `[1, 2, 3]`，再调用 `toString` 方法，返回 `1,2,3`，调用 `ToNumber`，返回NaN。

### ToPrimitive

语法如下：

```javascript
ToPrimitive(input[, PreferredType])
```

第一个参数是 input，表示要处理的输入值。

第二个参数是 PreferredType，非必填，表示希望转换成的类型，有两个值可以选，Number 或者 String。

当不传入 PreferredType 时，如果 input 是日期类型，相当于传入 String，否则，都相当于传入 Number。

如果传入的 input 是 Undefined、Null、Boolean、Number、String 类型，直接返回该值。

如果是 ToPrimitive(obj, Number)，处理步骤如下：

1. 如果 obj 为 基本类型，直接返回
2. 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
3. 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
4. 否则，JavaScript 抛出一个类型错误异常。

如果是 ToPrimitive(obj, String)，处理步骤如下：

1. 如果 obj为 基本类型，直接返回
2. 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
3. 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
4. 否则，JavaScript 抛出一个类型错误异常。



> 隐式转换场景

## 一元操作符 +

当 + 运算符作为一元操作符时，会调用 `ToNumber` 处理该值，相当于 `Number(value)`。

如果 value 是对象，会先调用 `ToPrimitive(obj, Number)` 方法。

```javascript
console.log(+['1']); // 1
console.log(+['1', '2', '3']); // NaN
console.log(+{}); // NaN
```

## 二元操作符 +

当计算 value1 + value2 时：

1. lprim = ToPrimitive(value1)
2. rprim = ToPrimitive(value2)
3. 如果 lprim 是字符串或者 rprim 是字符串，那么返回 ToString(lprim) 和 ToString(rprim) 的拼接结果
4. 返回 ToNumber(lprim) 和 ToNumber(rprim) 的运算结果

## == 相等

|  类型 (x)  |  类型 (y)  |        结果         |
| :--------: | :--------: | :-----------------: |
|    null    | undefined  |        true         |
| undefined  |    null    |        true         |
|    数值    |   字符串   |  x == ToNumber(y)   |
|   字符串   |    数值    |  ToNumber(x) == y   |
|   布尔值   |  任何类型  |  ToNumber(x) == y   |
|  任何类型  |   布尔值   |   x = ToNumber(y)   |
| 字符串或数 |    对象    | x = ToPrimitive(y)  |
|    对象    | 字符串或数 | ToPrimitive(x) == y |

