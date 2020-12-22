---
title: RESTful API 简介与实践
tags:
  - 规范
categories:
  - [技术]
date: 2020-10-21 17:02:37
---


RESTful API 相关

<!-- more -->

> **REST** 全称 **Representational State Transfer**，即「表现层状态转化」。符合 REST 原则的架构，就被称为 RESTful 架构。

## 简介

### 一、资源 (Resources)

REST 的名称「表现层状态转化」的主语其实是指的是「资源」(Resources)，即 "资源表现层状态转化"。

**资源**，就是网络上的一个实体，或者说是网络上的一个具体信息。可以是文本，图片，歌曲，服务等等。我们可以用一个 **URI** 指向它，每种资源对应一个特定的 **URI**。要获得这个资源，访问这个 URI就可以，因此 **URI** 也就成了每个资源的地址或者独一无二的标识符。

### 二、表现层 (Representation)

「资源」是一种信息实体，它可以有多种外在表现形式。**我们把「资源」具体呈现出来的形式，叫做它的「表现层」(Representation)**。

比如，文本可以用 txt 格式表现，也可以用 HTML，XML，JSON等格式表现，图片可以用 JPG 格式表现，也可以用 PNG 格式表现。

**URI** 只代表资源的实体，不代表表现形式。具体的表现格式，就属于「表现层」的范畴，而URI应该只代表「资源」的位置。它的具体表现形式，应该在HTTP请求的头信息中用 Accept 和 Content-Type 字段指定，这两个字段才是对「表现层」的描述。

### 三、状态转化 (State Transfer)

访问一个状态，就代表了客户端和服务端的一个互动过程。在这个过程中，必然涉及到数据和状态的变化。

互联网通讯协议 HTTP 协议，是一个无状态协议。也就是说，所有的状态都保存在服务器端。因此，**客户端想要操作服务器，就必须通过某种手段，使服务器发生「状态转化」(State Transfer)。而这种转化是建立在表现层上的，也就是「表现层状态转化」。**

在 HTTP 协议中，四个表示操作方式的动词：**GET，POST，PUT，DELETE**。他们分别对应四种基本操作：**GET 获取资源，POST 新建资源(也可以更新资源)，PUT 更新资源，DELETE 删除资源**。

### 四、总结

总结一下 RESTful 架构：

1. 每一个 **URI** 代表一种资源；
2. 客户端和服务器之间，传递这种资源的表现层；
3. 客户端通过四个 HTTP 动词，对服务端资源进行操作，实现「表现层状态转化」。

## 实践

### 一、URL设计

#### 1.1 动词 + 宾语

RESTful 的核心思想就是，客户端发出的数据操作指令都是「动词 + 宾语」的结构。比如，`GET /todos` 这个命令，`GET` 是动词，`/todos` 是宾语。

动词通常就是五种 HTTP 方法，对应 CRUD 操作。

> - GET：读取（Read）
> - POST：新建（Create）
> - PUT：更新（Update）
> - PATCH：更新（Update），通常是部分更新
> - DELETE：删除（Delete）

#### 1.2 动词的覆盖

有些客户端只能使用 `GET` 和 `POST` 方法。服务器必须接受 `POST` 模拟其他三个方法(`PUT`，`PATCH`，`DELETE`) 。

此时，客户端发出的 HTTP 请求，要加上 `X-HTTP-Method-Override` 属性，告诉服务器应该使用哪个动词来覆盖 `POST` 方法。

```
POST /api/todos/4 HTTP/1.1
X-HTTP-Method-Override: PUT
```

#### 1.3 宾语必须是名词

宾语就是 **API** 的 **URL**，是 **HTTP** 动词作用的对象。它应该是名词，不能是动词。

#### 1.4 复数 URL

既然 URL 是名词，那么应该使用复数，还是单数？

这没有统一的规定，但是常见的操作是读取一个集合，比如 `GET /articles`（读取所有文章），这里明显应该是复数。

为了统一起见，建议都使用复数 URL，比如 `GET /articles/2` 要好于 `GET /article/2`。

#### 1.5 避免多级 URL

常见的情况是，资源需要多级分类，因此很容易写出多级的 URL，比如获取某个作者的某一类文章。

```http
GET /authors/12/categories/2
```

改成查询字符串更好

```http
GET /authors/12?categories=2
```

### 二、状态码

#### 2.1 状态码必须精确

客户端的每一次请求，服务器都必须给出回应。回应包含 HTTP 状态码和数据两部分。

HTTP 状态码就是一个三位数，分成五个类别。

> - `1xx`：相关信息
> - `2xx`：操作成功
> - `3xx`：重定向
> - `4xx`：客户端错误
> - `5xx`：服务器错误

API 不需要 `1xx` 状态码

#### 2.2 状态码具体意义

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的 HTTP 动词）。

> - 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
> - 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
> - 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
> - 204 NO CONTENT - [DELETE]：用户删除数据成功。
> - 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
> - 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
> - 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
> - 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
> - 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
> - 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
> - 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
> - 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
> - 503 Service Unavailable: 服务器无法处理请求，一般用于网站维护状态

> 本文摘自阮一峰老师的 [理解RESTful架构](http://www.ruanyifeng.com/blog/2011/09/restful.html) 和 [RESTful API 最佳实践](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

