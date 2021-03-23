---
title: 一些TS中的运算符
tags:
  - TypeScript
date: 2021-01-28 17:59:30
---


近来用到了不少的 TypeScript 的运算符，但是也有很多是没用过的，本着学到就是赚到的想法，记录一下。

<!-- more -->

### 非空断言操作符 !

`!` 是一个后缀表达式操作符，可以用于断言操作对象是非 null 和非 undefined 类型。

```ts
const func = (str: string | null | undefined) => {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'.(2322)
  let onlyStr: string = str; // error

  let ignoredNullOrUndefined: string = str!; // ok
}
```

### ?. 运算符

`?.` 可选链，在我们遇到可能是 null 或 undefined 时就可以停止表达式的运行。

```ts
const a = b?.c
```
上述 TypeScript 代码在编译之后

```js
const a = b === null || b === void 0 ? void 0 : b.c;
```

所以使用 `?.` 运算符就可以自动检查对象 b 是否为 null 或 undefined，如果是就返回 undefined。
使用 `?.` 可以代替 `&&` 执行空检查。

```ts
const a = b && b.c

// equal to
const a = b?.c
```
值得注意的是，`?.` 只检查 null 和 undefined，对于空字串和 0，它是不会检查的。

> 可选链还可以和函数调用一起使用

```ts
const res = obj.func?.()
```
编译之后

```js
const res = (_a = obj.func) === null || _a === void 0 ? void 0 : _a.call(obj);
```

如果 obj 不存在 func 这个方法，就回返回 undefined.

注意事项：
- 如果 func 不存在于 obj，上面代码会产生一个 `TypeError` 异常
- 可选链的运算行为被局限在属性的访问，调用和元素的访问，不会延伸到后续的表达式，也就是说可选调用不会阻止 a?.b / someMethod() 表达式中的除法运算或 someMethod 的方法调用

### ?? 空值合并运算符

> 当左侧操作数为 null 或 undefined时，返回右侧的操作数，否则返回左边的操作符

与 || 运算符不同，`??` 也是只判断 null 和 undefined，其他的 falsy 它是不会返回右侧的。


### ?: 可选属性

这个运算符一般用在定义类型的时候

```ts
interface Person {
  age?: number;
  // equal to
  // age: number | undefined
}
```

#### Partial<T>

把某个接口的属性变成可选属性

```ts
interface Person {
  name: string;
  age: number;
}

/* type CopyPerson = {
  name?: string;
  age?: number;
} */

type CopyPerson = Partial<Person>
```
#### Required<T>

使用 `Required` 可以把可选属性转为必选属性。

### & 运算符

在 TypeScript 中使用 `&` 运算符可以将多个类型叠加成为一种类型。

> - 同名基础类型合并，如果存在相同的成员，那么该成员的类型会变成 never
> - 同名非基础类型合并，是可以合并的


### | 分隔符

> 在 TypeScript 中联合类型（Union Types）表示取值可以为多种类型中的一种，联合类型使用 | 分隔每个类型.

```ts
const test: string | undefined;
```
表示 `test` 可以是 string 或 undefined.


### Record

`Record<K extends keyof any, T>` 将 `K` 中所有的属性的值转化为 `T` 类型。

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}

// example
type Route = 'home' | 'demo' | 'help';

const route: Record<Route, string> = {
  home: string;
  demo: string;
  gelp: string;
}
```

### Pick

`Pick<T, K extends keyof T>` 将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

// example
interface Todo {
  title: string;
  description: string;
  status: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'status'>;

const todo: TodoPreview = {
  title: 'todo1',
  status: false
}
```

### EXclude

`Exclude<T, U>` 将某个类型中的另一个类型移除。

```ts
// 如果 T 能够赋值给 U，那么就返回 never 类型，否则返回 T 类型，其实就是将 T 中属于 U 的类型移除。
type Exclude<T, U> = T extends U ? : never : T

// example
type Demo = Exclude<'a' | 'b' | 'c', 'c'>; // 'a' | 'b'
```

### ReturnType

`ReturnType<T>` 用于获取函数 `T` 的返回类型。

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// example
type Demo = ReturnType<() => string>; // string
```
