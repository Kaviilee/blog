---
title: 浅尝 deno
date: 2021-01-05 00:01:36
tags:
---

新的一年新的开始！新的东西，学起！(扶朕起来，朕还可以再学

<!-- more -->

> 它是 Node.js 的替代品。有了它，将来可能就不需要 Node.js 了。  ———— 阮一峰《Deno 运行时入门教程：Node.js 的替代品》

## Deno 简介

Deno 是使用 V8 并内置于 Rust 的 JavaScript 和 TypeScript 的简单，现代且安全的运行时。Deno 是一个跨平台的运行时，即基于 Google V8 引擎的运行时环境，该运行时环境是使用 Rust 语言开发的，并使用 Tokio 库来构建事件循环系统。Deno 有以下优点：

- 默认安全。除非显式启用，否则不能访问文件，网络或环境
- 开箱即用的 TypeScript 支持
- 只分发一个可执行文件
- 具有内置的工具箱，比如依赖项检查工具（deno info）和 代码格式化工具（deno fmt）
- 拥有一组保证能够与 Deno 一起使用的经过审查的标准模块：`deno.land/std`
- 脚本可以打包到一个 JavaScript 文件中

### 一些命令

执行 `deno -h` 或 `deno --help` 就能够显示 Deno 支持的子命令，以下列举一些主要使用的命令

> - deno bundle：deno bundle [options] <source_file> [out_file]  将脚本和依赖打包
> - deno fmt：代码格式化
> - deno info：显示本地的依赖缓存
> - deno install：将脚本安装为可执行文件
> - deno repl：进入 REPL 环境
> - deno run：运行脚本

## 与 Node.js 的区别

其实一开始看到 Deno，我脑壳一痛，心想不会又是什么神奇的轮子吧？我真的学不动了，但是看了一下，发现还是有那么一点东西的。那么，Deno 既然是 Node.js 的 ”替代品“，究竟解决了 Node.js 的哪些痛点呢？

### 模块引入的方式

#### Node 模块引入

Node 内置 API 通过模块引入的方式引入。

```js
const path = require('fs')
fs.readFileSync('demo.txt')                     
```

#### Deno 全局对象

在 Deno 中则是一个全局对象 `Deno` 的属性和方法

```js
Deno.readFileSync('demo.txt')
```

### 模块系统

在模块系统方面，这是 Deno 和 Node.js 差别最大的地方。

#### Node.js CommonJS 规范

Node.js 采用的是 `CommonJS` 模块规范。具体规范见 [CommonJS规范](https://javascript.ruanyifeng.com/nodejs/module.html#)

```js
const fs = require('fs')

module.exports = function() {
    console.log('demo')
}
```

#### Deno 的模块规范

不同于 Node.js 的规范，Deno 所采用的模块规范是 [ES Module 规范](https://es6.ruanyifeng.com/#docs/module)

```js
import  as fs from "https//deno.land/std/fs/mod.ts"
import { Application } from "./initApp.js"
import creatApp from "./creatApp.ts"
```

在 Deno 中，可以直接 import url 来引用线上的资源，并且资源的扩展名和文件名不可以省略。

### 安全

Deno 简介就有提到 `默认安全`，说实话，这个东西就我目前应用来说，Node 不安全也没体验到。这个安全主要体现在 Deno 的操作很多都需要提供权限，比如：

```typescript
// demo.ts
const file = await Deno.creat("./bar.txt")
console.log(`create file: bar.txt`)
```

我们执行这段代码

```bash
$ deno run .\demo.ts
Check file:///C:/Users/lee/Desktop/demo.ts
error: Uncaught (in promise) PermissionDenied: read access to "bar.txt", run again with the --allow-read flag
    at processResponse (deno:core/core.js:223:11)
    at Object.jsonOpAsync (deno:core/core.js:240:12)
    at async open (deno:runtime/js/30_files.js:44:17)
    at async file:///C:/Users/lee/Desktop/demo.ts:1:14
```

这会告诉我们没有给予它 `--allow-read` 的权限，当我们给予它权限后，就能成功创建文件

```bash
$ deno run --allow-read --allow-write .\demo.ts
create file: bar.txt
```

除了 `read`、`write` 之外还有 `net`、 `env` 等权限，在需要权限的地方需要带上权限允许才能进行相关操作。当然也可以偷懒：

```bash
deno run --allow-all xxx
```

以上的操作肯定是与 Deno 的安全概念相违背的，这点开发者心中要有数。

### 支持 TypeScript

Deno 原生支持 TS，这点对于作为一个 TS 使用者的我来说实在是太赞了。Node.js 中要使用 TypeScript 的话还需要 `ts-node` 之类的工具的支持。

### 无 node_modules

不同于 Node.js，Deno 并没有 node_modules 来进行包管理。但是 Deno 在每次初执行时，会进行依赖的下载和编译，我们可以通过 `deno info` 来查看

```bash
$ deno info [file_name]
DENO_DIR location: "C:\\Users\\lee\\AppData\\Local\\deno"
Remote modules cache: "C:\\Users\\lee\\AppData\\Local\\deno\\deps"
TypeScript compiler cache: "C:\\Users\\lee\\AppData\\Local\\deno\\gen"
```

其实这就相当于是进行了包管理，编译后的文件，远程模块缓存都会放在相应的位置。

### 异步操作

Node 用回调的方式处理异步操作，而 Deno 则使用的是 Promise

```js
// node
const fs = require('fs')
fs.readFile('./demo.txt', (err, data) => {
    if (err) {
        throw(err)
    }
    console.log(data)
})

// deno
const data = await Deno.readFile('./demo.txt')
console.log(data)
```

## 这是实战

> 项目采用的框架是 `oak`，应该是对应了 Node.js 的 `Koa`，如果之前使用过 `Koa` 的话，使用 `oak` 这个框架应该会很熟悉。

### 准备工作

因为笔者是用的 VSCode 在开发，所以在开始写 Deno 项目前我们先做好相关设置。

在 `.vscode/settings.json` 中写入设置

```json
{
  "deno.enable": true,
  "deno.import_intellisense_origins": {
    "https://deno.land": true
  },
  "deno.lint": true,
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
  },
}
```

使得编辑器在写 deno 时能够进行代码提示。

### 项目结构

```bash
└── deno-demo
  ├── configs.ts # 配置信息文件
  ├── db # 数据库目录
  ├── controllers # 控制器目录
  ├── app.ts # 入口文件
  ├── middlewares # 中间件目录
  ├── models # 模型定义目录
  ├── routes.ts # 路由文件
  └── services # 服务层程序目录
```

### 入口文件

**app.ts**

```ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { HOST, PORT } from "./configs.ts";
import router from "./routes.ts";
import notFound from "./controllers/notFound.ts";
import errorMiddleware from "./middlewares/error.ts";

const app = new Application();

app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(`Listening on ${PORT}...`);

try {
 await app.listen(`${HOST}:${PORT}`);
} catch(e) {
 console.log(e)
}
```

从以上的代码来看，整个流程跟 Node.js 使用 Koa 开发几乎一样。

### 配置文件

**configs.ts**

```ts
const env = Deno.env.toObject();

export const HOST = env.HOST || "127.0.0.1";
export const PORT = env.PORT || 3000;
export const DB = env.DB || "./db/todos.json";
```

在配置文件中配置 `HOST`、`PORT`、`DB` 等参数。

### 路由配置

**routes.ts**

```ts
import { Router } from "https://deno.land/x/oak/mod.ts";
import getTodos from "./controllers/getTodos.ts";
import createTodo from "./controllers/createTodo.ts";
import updateTodo from "./controllers/updateTodo.ts";
import deleteTodo from "./controllers/deleteTodo.ts";

const router = new Router();

router
 .get("/todos", getTodos)
 .post("/todos", createTodo)
 .put("/todos/:id", updateTodo)
 .delete("/todos/:id", deleteTodo);

export default router;
```

路由文件也和使用 `Koa-router` 时的代码差不多。


### 定义模型（model）

定义模型在本项目中体现为定义了一个接口

**model/todo.ts**

```ts
export interface Todo {
 id: string;
 userId: number;
 title: string;
 status: boolean;
}
```

### 数据操作

**service/db.ts**

```ts
import { DB } from "../configs.ts";
import { Todo } from "../models/todo.ts";

// 获取 Todo 数据
export const fetchTodo = async (): Promise<Todo[]> => {
 const data = await Deno.readFile(DB);
 const decoder = new TextDecoder();
 const decodedData = decoder.decode(data);

 return JSON.parse(decodedData);
};

// 写入 Todo 数据
export const persistTodo = async (data: Todo[]): Promise<void> => {
 const encoder = new TextEncoder();
 await Deno.writeFile(DB, encoder.encode(JSON.stringify(data)));
};
```

### 数据的增删改查

详情见项目的 `controllers` 下的文件

### Not Found

当 api 不能匹配到对应的路由时，返回 `Not Found` 信息

**controllers/notFound.ts**

```ts
import { Response } from "https://deno.land/x/oak/mod.ts";

export default ({ response }: { response: Response }) => {
 response.status = 404;
 response.body = { message: "Not Found" };
};

```

### 中间件 `Middlewares`

我们定义了一个中间件 `error.ts` 来处理读不到数据的错误

**moddlewares/error.ts**

```ts
import { Response } from "https://deno.land/x/oak/mod.ts";

export default async (
 { response }: { response: Response },
 next: () => Promise<void>,
) => {
 try {
  await next();
 } catch (err) {
  response.status = 500;
  response.body = { message: err.message };
 }
};
```

### 总结

在进行以上代码的写入后，我们就可以进行 `run` 整个项目了

注意 `run` 的时候要带上 `-A` 或 `--allow-all`，意思是给予全部权限给当前项目。

```bash
deno run -A ./app.ts

Check file:///D:/DenoDemo/app.ts
Listening on 3000...
```

ok！整个项目就跑起来啦。这次 deno 的初体验也就完成了。完整代码的地址是 [deno-demo](https://github.com/Kaviilee/deno-demo)。

## 注意事项

1. 不能开代理。否则无法运行

