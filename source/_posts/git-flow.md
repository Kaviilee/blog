---
title: Git Flow
date: 2020-09-03 09:56:17
tags:
    - git
---

之前偶尔看到的一篇文章，是讲 Git Flow 的，谈了分支相关的一些知识。

<!-- more -->

## Git Flow

### 分支应用场景

根据 Git Flow 的建议，主要的分支有 master、develop、hotfix、release 以及 feature 这五种分支，各种分支负责不同的功能。其中 Master 以及 Develop 这两个分支又被称作长期分支，因为他们会一直存活在整个 Git Flow 里，而其它的分支大多会因任务结束而被刪除。

### Master 分支

主要是用来放稳定、随时可上线的版本。这个分支的来源只能从别的分支合并过来，开发者不会直接 Commit 到这个分支。因为是稳定版本，所以通常也会在这个分支上的 Commit 上打上版本号 tag。

**每个版本发布完，develop 会合并到 master，并打tag**。

### Develop 分支

这个分支主要是所有开发的基础分支，当要新增功能的时候，所有的 Feature 分支都是从这个分支切出去的。而 Feature 分支的功能完成后，也都会合并回来这个分支。

**开发过程中的稳定分支，develop分支应该保证每次最新的commit都是可以被run的**。

### Hotfix 分支

当线上产品发生紧急问题的时候，会从 Master 分支开一个 Hotfix 分支出来进行修复，Hotfix 分支修复完成之后，会合并回 Master 分支，也同时会合并一份到 Develop 分支。

### Release 分支

当认为 Develop 分支够成熟了，就可以把 Develop 分支合并到 Release 分支，在这边进行算是上线前的最后测试。测试完成后，Release 分支将会同时合并到 Master 以及 Develop 这两个分支上。 Master 分支是上线版本，而合并回 Develop 分支的目的，是因为可能在 Release 分支上还会测到并修正一些问题，所以需要跟 Develop 分支同步，免得之后的版本又再度出现同样的问题。

**其实正常的做法应该是提测，或测试到某个阶段以后使用。一般用在多版本并行开发的时候，充当特定版本的develop 分支使用**

### Feature 分支

当要开始新增功能的时候，就是使用 Feature 分支的时候了。 Feature 分支都是从 Develop 分支来的，完成之后会再并回 Develop 分支。

**目前feature分支起名规则以 dev_ 开头，后面跟当前开发功能**

## 分支提交与合并

**如果 feature 需要 develop 的功能，不要将 develop 分支 merge 到 feature 分支，应该使用 feature rebase develop**

分支提交使用 rebase 或 merge 方式都可以，一般来说commit 少的场景我会比较喜欢 rebase，但如果commit攒的多了，rebase 解决冲突会很累。

### rebase 操作

例如，开始开发时，分支是这样的

```shell
* -- * -- A (develop)
           \
            * (dev_xxx)
```

开发完成，准备提交时：

```shell
* -- * -- A -- B -- C -- D -- E (develop)
           \
            * -- X -- Y -- Z (dev_xxx)
```

命令行步骤如下（GUI参考命令行执行对应操作）

```shell
git add .

git commit -m "xxx"

git pull  //用于更新远端分支(git fetch 也可以)

git rebase origin/develop //将当前分支base变为develop 的最新 commit
```

这一步的实际原理是，git会从develop新开一个分支，将你当前的dev_xxx 分支的 commit 按照提交顺序挨个 cherry-pick 到新开分支上

这一步执行过程中如果 develop 的 B C D E等commit 与 X Y Z 冲突，则需要依次解决冲突

解决冲突以后，执行 `git rebase --continue` 或者 `git rebase --skip` 继续执行接下来的 rebase

rebase 结束后，分支结构将变为：

```shell
* -- * -- A -- B -- C -- D -- E (develop)
                               \
                                 -- * -- X -- Y -- Z (dev_xxx)
```

然后需要执行

```shell
git push -f // 必须加 -f 强制推送，否则由于本地分支的base与远端不一致，会报需要 git pull 无法提交
```

提交完成后去 gitlab 创建 merge request，走正常 review 流程，合并代码。

<br />

本文转载自 [再聊 Git Flow](https://www.kymjs.com/manager/2020/05/29/01/)
