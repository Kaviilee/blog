---
title: 约定式提交 (Conventional Commits)
tags:
  - git
  - 规范
date: 2020-10-13 00:19:25
---


关于约定式提交的规范内容。

<!-- more -->

# 约定式提交

> 一种用于给提交信息增加人机可读含义的规范。

## 概述

约定式提交规范是一种基于提交消息的轻量级约定。 它提供了一组用于创建清晰的提交历史的简单规则； 这使得编写基于规范的自动化工具变得更容易。在提交信息中描述新特性、bug 修复和破坏性变更。

提交说明的结构如下：

```
<类型>[可选的作用域]: <描述>
[可选的正文]
[可选的脚注]
```

提交说明包含了下面的结构化元素，以向类库使用者表明其意图：

1. __fix__: 类型为 `fix` 的提交表示在代码库中修复了一个 bug。
2. **feat**: 类型为 `feat` 的提交表示在代码库中新增了一个功能。
3. **BREAKING CHANGE**: 在可选的正文或脚注的起始位置带有 `BREAKING CHANGE:` 的提交，表示引入了破坏性 API 变更。破坏性变更可以是任意 *类型 *提交的一部分。
4. **其它情况:** 除 `fix:` 和 `feat:` 之外的提交 *类型* 也是被允许的，例如 [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)（基于 [Angular 约定](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)）中推荐的 `chore:`、`docs:`、`style:`、`refactor:`、`perf:`、`test:` 及其他标签。 我们也推荐使用`improvement`，用于对当前实现进行改进而没有添加新功能或修复错误的提交。 请注意，这些标签在约定式提交规范中并不是强制性的。并且在语义化版本中没有隐式的影响（除非他们包含 BREAKING CHANGE）。 可以为提交类型添加一个围在圆括号内的作用域，以为其提供额外的上下文信息。例如 `feat(parser): adds ability to parse arrays.`。

## 示例

###  包含了描述以及正文内有破坏性变更的提交说明

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### 不包含正文的提交说明

```
docs: correct spelling of CHANGELOG
```

### 包含作用域的提交说明

```
feat(lang): add polish language
```

### 为 fix 编写的提交说明，包含（可选的） issue 编号

```
fix: correct minor typos in code

see the issue for details on the typos fixed

closes issue #12
```

##  约定式提交规范

1. 每个提交都**必须**使用类型字段前缀，它由一个名词组成，诸如 `feat` 或 `fix` ，其后接一个**可选的**作用域字段，以及一个**必要的**冒号（英文半角）和空格。
2. 当一个提交为应用或类库实现了新特性时，**必须**使用 `feat` 类型。
3. 当一个提交为应用修复了 bug 时，**必须**使用 `fix` 类型。
4. 作用域字段**可以**跟随在类型字段后面。作用域**必须**是一个描述某部分代码的名词，并用圆括号包围，例如： `fix(parser):`
5. 描述字段**必须**紧接在类型/作用域前缀的空格之后。描述指的是对代码变更的简短总结，例如： *fix: array parsing issue when multiple spaces were contained in string.*
6. 在简短描述之后，**可以**编写更长的提交正文，为代码变更提供额外的上下文信息。正文**必须**起始于描述字段结束的一个空行后。
7. 在正文结束的一个空行之后，**可以**编写一行或多行脚注。脚注**必须**包含关于提交的元信息，例如：关联的合并请求、Reviewer、破坏性变更，每条元信息一行。
8. 破坏性变更**必须**标示在正文区域最开始处，或脚注区域中某一行的开始。一个破坏性变更**必须**包含大写的文本 `BREAKING CHANGE`，后面紧跟冒号和空格。
9. 在 `BREAKING CHANGE: `之后**必须**提供描述，以描述对 API 的变更。例如： *BREAKING CHANGE: environment variables now take precedence over config files.*
10. 在提交说明中，**可以**使用 `feat` 和 `fix` 之外的类型。
11. 工具的实现**必须不**区分大小写地解析构成约定式提交的信息单元，只有 `BREAKING CHANGE` **必须**是大写的。
12. **可以**在类型/作用域前缀之后，`:` 之前，附加 `!` 字符，以进一步提醒注意破坏性变更。当有 `!` 前缀时，正文或脚注内**必须**包含 `BREAKING CHANGE: description`

<br />

> 更多内容在 [conventionalcommits](https://www.conventionalcommits.org/)
