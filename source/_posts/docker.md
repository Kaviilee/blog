---
title: docker学习笔记
tags: docker
author:
    name: Kaviilee
    avatar: https://cdn.jsdelivr.net/gh/Kaviilee/cdn@1.1/blog/images/custom/papalymo.jpg
categories:
    - ['技术']
date: 2020-07-21 00:03:15
---

这是在看完狂神的docker视频之后做的笔记~存档用

<!-- more -->

## Docker概述

### Docekr为什么会出现

一款产品有开发和生产两套环境，两套应用配置

开发和运维问题：这个项目在我的电脑上是可以运行的！版本更新迭代，不同版本环境的兼容，导致服务不可用

环境配置问题：环境配置是非常麻烦的，每个机器都要部署环境，费时费力

思考：项目是否可以带上环境一起安装打包？把原始环境一模一样地复制过来

在服务器上部署十分麻烦，不能跨平台

传统开发：开发人员做项目。运维人员做部署

现在：开发打包部署上线，一起做

### Docker能干什么？

> 之前的虚拟机技术，所有的项目都在同一个环境下运行

![](https://i.loli.net/2020/08/14/XKaBgUARTQxqc2b.png)

虚拟机的缺点

```
1.占用资源非常多
2.冗余技术多
3.启动很慢
```

> 容器化技术

`容器化技术不是一个完整的操作系统`

![image-2020070202](https://i.loli.net/2020/08/14/uYhFIpJeADPOQ5r.png)

比较docker和虚拟机技术的不同

- 传统的虚拟机，虚拟出一套硬件后，在其上运行一个完整的操作系统，在该操作系统上安装和运行软件
- 容器内的应用直接运行在宿主机的内核，容器是没有自己的内核的，也没有进行硬件虚拟，更加轻便
- 每个容器间都是相互隔离的，每个容器都有自己的文件系统，互不影响，能区分计算资源

> DevOps(开发，运维)

**更快速的交付和部署**

传统：一堆帮助文档，安装程序

docker： 一键运行打包镜像发布测试

**更便捷的升级和扩缩容**

使用了Docker之后,我们部署应用就像搭积木一样!

项目打包为一个镜像,扩展,服务器A!服务器B

**更简单的系统运维**

在容器化之后，我们开发，测试环境是高度一致的

**更高效的计算机资源利用**

Docker是内核级别的虚拟化，可以在一个物理机上运行很多的容器实例，服务器性能可以被压榨到极致

## Docker安装

### Docker的基本组成

![docker架构图](https://oscimg.oschina.net/oscnet/6980be9f402ffabf9c044b8170630006086.png)

**镜像(image)**

docker镜像好比一个模板，可以通过这个模板来创建容器服务nginx镜像=> run => nginx01(提供服务器)

通过这个镜像可以创建多个容器(最终服务运行或者项目运行就是在容器中的)

**容器(container)**

docker利用容器技术，独立运行一个或一组应用，通过镜像来创建

容器和镜像关系类似于面向对象编程中的对象和类。

启动，停止，删除，基本命令

**仓库(repository)**

仓库就是存放镜像的地方

仓库分为共有仓库和私有仓库

Docker hub（默认国外镜像）阿里云 网易有国内镜像加速服务

### 安装Docker

#### CentOS Docker安装

> 环境准备

1. 会一点Linux基础
2. CentOS7
3. 使用XShell连接远程服务器

> 环境查看

```
# 查看系统内核
# uname -r
3.10.0-1062.18.1.el7.x86_64
```

```
#系统版本
# cat /etc/os-release
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"
```

> 安装Docker

```
# 一, 卸载旧的版本
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
                 
# 2, 需要安装的包
yum install -y yum-utils \
	device-mapper-persistent-data \
	lvm2

#3. 设置镜像仓库
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo #默认是国外的

yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo #推荐使用
#更新yum软件包索引
yum makecache fast
#安装docker    
sudo yum install docker-ce docker-ce-cli containerd.io 
#启动docker
systemctl start docker
#查看docker版本
docker version
```

> 下载镜像
>
> docker pull [要下载的镜像]

> 查看下载的镜像
>
> docker images (docker image ls)

卸载docker

```
yum remove docker-ce docker-ce-cli containerd.io

rm -rf /var/lib/docker #docker默认工作路径
```

#### Windows Docker安装（win10）

下载官方docker-desktop安装程序

> https://www.docker.com/products/docker-desktop

开启Hyper-V

```shell
# 开启搜索
win + s
# 输入
启用或关闭windows功能
```

![](https://i.loli.net/2020/08/14/kEfpcwAuH7BGl45.png)

选中Hyper-V

![](https://i.loli.net/2020/08/14/8pywI4dJSsPqVXh.png)

#####  配置镜像加速

![image-20200720114221052](https://i.loli.net/2020/07/20/1QNDC4Ug2wVuIW8.png)

### 底层原理

**Docker是怎么工作的**

Docker是一个C/S结构的系统，Docker的守护进程运行在主机上，通过Socket从客户端访问

DockerServer接收到Docker-Client的指令，就会执行这个命令

![docker底层](https://i.loli.net/2020/08/14/qTZ1yHfGixmYtU2.png)

Docker为什么比VM快

1. Docker有着比虚拟机更少的抽象层
2. Dcoker利用的是宿主机的内核，Vm需要的是Guest OS

![docker与虚拟机](http://hongyitong.github.io/img/docker.png)

新建一个容器的时候，Docker不需要像虚拟机一样重新安装一个操作系统内核，虚拟机是加载Guest OS，分钟级别的，而Docker是利用宿主机的操作系统，省略了这个复杂的过程

****

## Docker命令

### 帮助命令

```
docker version #docker版本
docker info #显示docker的系统信息，包括镜像和容器数量
docker [命令] --help #查看某个具体的命令
```

### 镜像命令

**docker images** 查看下载的所有镜像

```
# docker images
REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
mysql                     5.6                 8de95e6026c3        20 hours ago        302MB
redis                     latest              36304d3b4540        12 days ago         104MB
mysql                     latest              30f937e841c8        2 weeks ago         541MB
centos/mysql-57-centos7   latest              f83a2938370c        8 months ago        452MB
# 解释
REPOSITORY 镜像的仓库名
TAG 镜像的标签
IMAGE ID 镜像ID
CREATED 镜像创建时间
SIZE 镜像的大小

#可选项
Options:
  -a, --all             #列出所有镜像
  -q, --quiet           #只显示镜像ID
```

**docker  search** 搜索镜像

```
docker search mysql
NAME	DESCRIPTION									STARS	OFFICIAL	AUTOMATED	
mysql	MySQL is a widely used, open-source relation…  9604     [OK]                

#可选项,通过收藏来过滤
--filter=stars=3000 #搜索出来的镜像收藏就是大于3000的
```

**docker pull** 拉取镜像

```
docker pull nginx [:tag]
Using default tag: latest #如果不写tag 默认使用最新版本
latest: Pulling from library/nginx
8559a31e96f4: Pull complete  #分层下载,docker image核心 联合文件系统
8d69e59170f7: Pull complete 
3f9f1ec1d262: Pull complete 
d1f5ff4f210d: Pull complete 
1e22bfa8652e: Pull complete 
Digest: sha256:21f32f6c08406306d822a0e6e8b7dc81f53f336570e852e25fbe1e3e3d0d0133 #签名
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest #真实地址

# docker pull nginx 等价于 dicker pull docker.io/library/nginx:latest
```

**docker rmi** 删除镜像

```shell
# 删除指定的镜像
$ docker rmi -f 8de95e6026c3 
# 删除全部的镜像
$ docker rmi -f $(docker images -ap)
# 清空临时镜像
$ docker rmi $(docker images -q -f dangling=true)
```

**docker build** 使用Dockerfile创建镜像

```shell
# 使用当前目录的Dockerfile创建镜像 当dockerfile的命名为Dockerfile就不需要制定文件名 -f
$ docker build -t node:10.15-alpine .
$ docker build -f /path/to/a/Dockerfile . # /path/to/a
```



### 容器命令

**新建容器并启动**

```shell
docker run [options] image
# options
# 若image本地没有则会去docker镜像库拉取
--name=""  容器名字 用于区分容器
-d         后台方式运行
-it        使用交互方式运行,进入容器查看内容
-p	       指定容器的端口 -p 80:8080  主机端口:容器端口
-P(大写)    随机指定端口 
```

**列出所有运行的容器**

```shell
# docker ps 命令 列出当前正在运行的容器
# options
-a	 # 列出当前正在运行的容器+历史运行过的容器
-n=? # 显示最近创建的容器
-q	 # 只显示容器的编号
$ docker ps 
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
$ docker ps -a 
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                    PORTS               NAMES
919e58ff5521        redis               "docker-entrypoint.s…"   20 hours ago        Exited (0) 16 hours ago                       redis
```

**退出容器**

```shell
exit #直接容器停止并退出
```

**删除容器**

```shell
$ docker rm 容器id
$ docker rm -f $(docker ps -aq) #删除所有的容器
```

**启动和停止容器**

```shell
$ docker start 容器id or 容器name # 启动一个或多个已经被停止的容器
$ docker restart 容器id or 容器name # 重启容器
$ docker stop 容器id or 容器name # 停止运行中的容器
$ docker kill 容器id or 容器name # 杀掉运行中的容器
```

### 其他常用命令

**后台启动容器**

```shell
$ docker run -d 镜像名
```

**查看容器中进程信息**

```shell
$ docker top 容器id
```

**查看镜像元数据**

```shell
$ docker inspect 容器id or 容器name
```

**进入当前正在运行的容器**

```shell
#我们通常容器都是使用后台方式运行的,需要进入容器,修改一些配置

#命令
# 进入容器后开启一个新的终端,可以在里面操作(常用) 退出shell不会导致容器停止运行
$ docker exec -it 容器id or name bashshell 默认命令行

# 进入容器正在执行的终端,不会启动新的进程 如果退出shell，容器会停止运行
$ docker attach 容器id or 容器name
```

**从容器内拷贝文件到主机上**

```shell
$ docker cp 容器id: 容器内路径 目的主机路径
```

**docker system命令**

```shell
# 查看docker磁盘占用情况
$ docker system df
# 命令可以用于清理磁盘，删除关闭的容器、无用的数据卷和网络
$ docker system prune
-a # 没有容器使用的docker容器都删除
```

**手动清除Docker镜像/容器/数据卷**

```shell
# 删除所有dangling镜像(即无tag的镜像)
$ docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
# 删除所有 dangling 数据卷(即无用的 volume)
$ docker volume rm $(docker volume ls -qf dangling=true)
```



## Docker镜像

### 镜像是什么

镜像就是一个轻量级的，可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码，运行时，库，环境变量和配置文件。

**如何得到镜像**

- 从远处仓库下载
- 拷贝
- 自己制作一个镜像Dockerfile

### Docker镜像加载原理

> UnionFs(联合文件系统查询)

我们下载的时候看到的一层一层就是这个

UnionFs(联合文件系统): Union文件系统(UnionFS)是一种分层,轻量级并且高性能的文件系统,它支持对文件系统的修改作为一次提交来一层层的叠加,同时可以将不同目录挂载到同一个虚拟文件系统下,Union文件系统是Docker镜像的基础,镜像可以通过分层来进行继承,基于基础镜像(没有父镜像),可以制作各种具体的应用镜像

特性: 一次同时加载多个文件系统,但从外面看起来,只能看到一个文件系统,联合加载会把各层文件系统叠加起来,这样最终的文件系统会包含所有底层的文件和目录结构

> Docker镜像加载原理

docker的镜像实际上由一层一层的文件系统组成,这种层级的文件系统UnionFS

bootfs(boot file system)主要包含bootlloader和kernel,bootfs主要是引导加载kernel,Linux刚启动时会加载bootfs文件系统,在docker镜像的最底层是bootfs,这一层与我们典型的Linux/Unix系统是一样的,包含boot加载器和内核,当boot加载完成之后整个内核就在内存中了,此时内存的使用权已由bootfa转交给内核,此时系统也会卸载bootfs

rootfs(root file system),在bootfs之上,包含的就是典型Linux系统中的/dev, /proc,/bin, /etc等标准目录和文件,rootfs就是各种不同的操作系统发行版,比如Ubuntu, CentOS等等

![镜像分层](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9XbElrc3Y1RVVKa2hrdUU3MEZSeGhZRllsSkVpYkl5bmFzOWUxU1BFMDBwNEtsR0RjTUdiN1hwOGliS2hKVXVmdFl1OXNwMmljWmgwSjBsbm11ZVhTWTZWQS82NDA?x-oss-process=image/format,png)

### 分层理解

镜像下载的时候是一层一层的在下载

思考: 为什么Docker镜像要采用这种分层的结构呢?

最大好处,我觉得莫过于资源共享了!比如有多个镜像都从相同的Base镜像构建而来,那么宿主机

只需在磁盘上保留一份base镜像,同时内存中也只需要加载一份base镜像,这样就可以为所有的容器服务了,而且镜像的每一层都可以被共享

查看镜像分层的方式可以通过 **docker image inspec**t 命令!

### commit镜像

```shell
$ docker commit 提交容器成为一个新的镜像

#命令和git原理类似
$ docker commit -m="提交的描述信息" -a="作者" 容器ID 目标镜像名:[tag]
```

## 容器数据卷

### 什么是容器数据卷

**docker的理念回顾**

将应用和环境都打包成一个镜像！

如果数据都在容器中，那么我们容器删除，数据就会丢失！**<mark> 需求: 数据可以持久化 </mark>**

mysql，容器删了，数据丢失. **<mark> 需求：mysql数据可以存储到本地 </mark>**

容器之间可以有一个数据共享的技术！Docker容器中产生的数据，同步到本地

目录的挂载,将容器内的目录挂载到Linux上面

**总结一句话: 容器的持久化和同步操作! 容器间也可以数据共享的!**

### 使用数据卷

> 方法一：直接使用命令来挂载 -v

```shell
$ docker run -it -v 主机目录:容器内目录 -p 主机端口:容器端口
# 启动起来我们可以使用 docker inspect 容器id
```

![容器信息](https://static01.imgkr.com/temp/d5a266188ba1427596296c38e950f1fc.png)

### 实战:安装MySQL

```shell
# 获取镜像
$ docker pull mysql:5.7
# 运行容器,需要做数据挂载! # 安装启动mysql,需要配置密码,这是官方的
# 官方测试: docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=密码 -d mysql:tag

#启mysql
-d  后台运行
-p  端口映射
-v  端口映射
-e  环境配置
--name 容器名

$ docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root --name mysql01 mysql:5.7

# 启动成功之后，我们在本地使用navicat来测试连接
#navicat-连接到服务器的3310 --- 3310和容器内的3306映射，这个时候我们就可以连接上了
```

假设我们将容器删除，挂载到本地 的数据卷依旧没有丢失，这就实现了容器数据持久化功能

### 具名和匿名挂载

```shell
# 匿名挂载
-v 容器内路径
$ docker run -d -p 8080:80 --name nginx01 -v /etc/nginx nginx:alpine

# 查看所有的volume情况
$ docker volume ls
DRIVER              VOLUME NAME
local               b448950f96ca2daed2a90cd21e687431653dc9a2f40ccf51e0ce38432f6564a4
# 这个就是匿名挂载，-v时只写了容器内路径，没有写

# 通过 -v 卷名:容器内路径
```

所有的docker容器内的卷,没有指定目录的情况下都是在/var/lib/docker/volumes/卷名/_data

我们通过具名挂载可以方便的找到一个卷,大多数情况在使用的`具名挂载`

```shell
# 如何确定是具名挂载还是匿名挂载还是指定路径挂载
-v 容器内路径 # 匿名挂载
-v 卷名:容器内路径 # 具名挂载
```

拓展：

```shell
#通过 -v  容器内路径: ro rw 改变读写权限
# ro read only
# read and write

#一旦设置了容器权限,容器对挂载出来的内容就有限定了!
docker -run -P -name nginx01 -v /etc/nginx:ro nginx
docker -run -P -name nginx01 -v /etc/nginx:rw nginx
ro : 只要看到ro就说明这个路径只能通过宿主机来改变,容器内部无法操作
```



## Dockerfile

dockerfile是用来构建docker镜像的文件，命令参数脚本！

构建步骤：

1. 编写一个dockerfile文件
2. docker build构建成为一个镜像
3. docker run镜像
4. docker push发布镜像（DockerHub，阿里云镜像仓库）

![docker官方镜像file](https://wx2.sbimg.cn/2020/07/05/C4mZV.png)

很多官方镜像都是基础包，很多功能都是没有的，我们通常自己打剑自己的镜像

### Dockerfile的构建过程

**基础知识**：

1. 每个保留关键字(指令)都必须是大写字母
2. 执行从上到下顺序执行
3. #表示注释
4. 每一条命令都会创建提交一个镜像层，并提交

![enter description here](https://i.loli.net/2020/07/20/B6Kh2SznJNAdG7P.png)

dockerfile是面向开发的，我们以后要发布项目，做镜像，就需要编写dockerfile文件，这个文件十分简单！

Docker镜像逐渐成为企业交付的标准，必须要掌握

步骤： 开发，部署，运维

Dockerfile：构建文件，定义了一切步骤，源代码

DockerImages：通过Dockerfile构建生成的镜像，最终发布和运行的产品

Docker容器：容器就是镜像运行起来提供服务器

### Dockerfile的指令

```shell
FROM 	      # 基础镜像, 一切从这里开始构建
MANTAINER     # 镜像是谁写的, 姓名+邮箱
RUN           # 镜像构建的时候需要运行的命令
ADD           # 步骤, tomcat镜像,压缩包! 添加内容
WORKDIR       # 镜像的工作目录
VOLUME        # 挂载的目录
EXPOSE        # 暴露端口配置
CMD           # 指定这个容器启动的时候要运行的命令,只有最后一个会生效,可被替代
ENTRYPOINT    # 指定这个容器启动的时候要运行的命令,可以追加命令
ONBUILD       # 当构建一个被继承 DockerFile 这个时候就会运行ONBUILD的指令,触发指令
COPY	      #	类似ADD,将我们文件拷贝到镜像中
ENV 	      # 构建的时候设置环境变量
```

![dockerfile命令](https://wx1.sbimg.cn/2020/07/06/CXzSa.png)

### 实战测试

Docker Hub 中99%镜像都是从centos基础镜像过来的,然后配置需要的软件

![](https://wx2.sbimg.cn/2020/07/06/CXWEK.png)

> 创建一个自己的centos

```dockerfile
# 1. 编写dockerfile文件
FROM centos
MAINTAINER jiawei<jiaweilee95@126.com>

ENV MYPATH /usr/local
WORKDIR ${MYPATH}

RUN yum -y install vim && yum -y install net-tools

EXPOSE 80

CMD echo ${MYPATH} && echo "--end--" && /bin/sh

# 2. 通过这个文件构建镜像
docker build -f <dockerfile文件目录> -t <镜像名:[tag]> .

# 3. 测试
```



> CMD和ENTRYPOINT的区别

```shell
CMD           # 指定这个容器启动的时候要运行的命令,只有最后一个会生效,可被替代
ENTRYPOINT    # 指定这个容器启动的时候要运行的命令,可以追加命令
```

测试CMD

```shell
# 编写dockerfile文件
$ vim dockerfile-cmd-test

FROM centos
CMD ["ls", "-a"]

# 构建镜像
$ docker build -f dockerfile-cmd-test -t centos .

# run 运行，发现ls -a生效
$ docker run 963149b1ac5d
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var

# 想要追加一个命令 -l  ls -al
$ docker run 963149b1ac5d -l
docker: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "exec: \"-l\": executable file not found in $PATH": unknown.
ERRO[0000] error waiting for container: context canceled 

# cmd的情况下 替换了CMD["ls","-a"]命令,-不是命令追加
```

ENTRYPOINT是往命令之后追加

```shell
# 编写dockerfile文件
$ vim dockerfile-cmd-test

FROM centos
ENTRYPOINT ["ls", "-a"]

# 构建镜像
$ docker build -f dockerfile-cmd-test -t centos .

# run 运行，发现ls -a生效
$ docker run 963149b1ac5d
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var

# 想要追加一个命令 -l  ls -al
$ docker run 963149b1ac5d -l
# 这里是生效的
```

### 实战：Tomcat镜像

1. 准备镜像文件 tomcat压缩包，jdk压缩包
2. ![](https://img-blog.csdnimg.cn/20200619184436678.png#pic_center)
3. 编写Dockerfile文件，官方命名<mark>Dockerfile</mark>，build会自动寻找这个文件，就不需要-f指定文件了

```shell
FROM centos
MAINTAINER czp<2432688105@qq.com>

COPY readme.txt /usr/local/readme.txt

ADD apache-tomcat-9.0.33.tar.gz /usr/local/

ADD jdk-8u221-linux-x64.rpm /usr/local/


RUN yum -y install vim
 
ENV MYPATH /usr/local
 
WORKDIR $MYPATH
 
ENV JAVA_HOME /usr/local/jdk1.8.0_11
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.33

ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.33

# 配置环境变量
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:/CATALINA_HOME/bin

EXPOSE 8080

CMD /usr/local/apache-tomcat-9.0.33/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.33/bin/logs/catalina.out
```

4. 构建镜像

   ```shell
   # docker build -t diytomcat .
   ```

5. 本地测试

   > curl localhost:9090

### 发布镜像

> Dokcerhub

1. 地址hub.docker.com 注册自己的账号!

2. 确定这个账号可以登录

3. 在服务器上提交自己的镜像

   ```shell
   $ docker login --help
   
   Usage:  docker login [OPTIONS] [SERVER]
   
   Log in to a Docker registry.
   If no server is specified, the default is defined by the daemon.
   
   Options:
     -p, --password string   Password
         --password-stdin    Take the password from stdin
     -u, --username string   Username
   ```

4. 登录完毕就可以提交镜像了,就是一步 docker push

> 提交到阿里云镜像仓库

1. 登录阿里云

2. 找到容器镜像服务

3. 创建命名空间

   ![](https://i.loli.net/2020/08/14/jFcRduLDS4wpnsY.png)

4. 创建容器镜像

   ![QQ截图20200814170112.png](https://i.loli.net/2020/08/14/rGJLpDIsCcE49b7.png)

5. 浏览阿里云

   ![QQ截图20200814171154.png](https://i.loli.net/2020/08/14/axQFySgmeY3OTCB.png)

### 小结

![](https://static.packt-cdn.com/products/9781787120532/graphics/B06157_10_04-1.png)



![](https://blog.fntsr.tw/wp-content/uploads/2014/12/Docker-Command-Diagram.png)

## Docker网络原理

### 理解Docker0

清空所有环境

> 测试

![enter description here](https://i.loli.net/2020/07/20/PHnrqkQRxTziwvt.png)

三个网络

```shell
# docker是如何处理容器网络访问的？

$ docker run -d -P --name tomcat01 tomcat
# 查看容器内部网络地址 ip addr 发现容器启动的时候会得到一个eth0@if8 ip地址，docker分配的
$ docker exec -it tomcat01 ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: sit0@NONE: <NOARP> mtu 1480 qdisc noop state DOWN group default qlen 1000
    link/sit 0.0.0.0 brd 0.0.0.0
7: eth0@if8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
# linux能ping通容器内部
```

> 原理

1. 我们每启动一个docker容器，docker就会给docker容器分配一个ip，我们只要安装了docker，就会有一个网卡docker0

   桥接模式，使用的是veth-pair技术

   再次测试 ip addr

   ![enter description here](https://i.loli.net/2020/07/20/2esohKzy4MgYbXu.png)

2. 再启动一个容器，发现又多了一对网卡

   ![enter description here](https://i.loli.net/2020/07/20/rFbTA9SH3LfIhDz.png)

   ```shell
   # 我们发现这个容器带来网卡, 都是一对对的
   # veth-pair 就是一对虚拟机设备接口,他们都是成对出现的,一端连着协议,一端彼此相连
   # 正因为有这个特性,veth-pair 充当桥梁,连接各种虚拟网络设备的
   # openStac,Docker容器之间的连接,OVS的连接,都是使用 veth-pair 技术
   ```

3. 测试tomcat01 和tomcat02是否能ping通

   ```shell
   # 结论：容器和容器之间是可以互相ping通的
   ```

   ![enter description here](https://i.loli.net/2020/07/20/RTQcMNI1js4gp8q.png)

结论: **tomcat01和tomcat02是共用的一个路由器,docker0**

所有的容器不指定网络的情况下,都是docker0路由的,docker会给我们的容器分配一个默认的可用IP

> 小结

Docker使用的是linux的桥接，宿主机是一个Docker容器的网桥 Docker0

![enter description here](https://i.loli.net/2020/07/20/FjIyzRZqDNavBeb.png)

Docker中所有的网络接口都是虚拟的,虚拟的转发效率高（内网传递文件）

**只要容器删除,对应网桥的一对就没了**



### --link

> 思考一个场景，我们编写了一个微服务，database url = ip；项目不重启，数据库ip改变了，我们希望可以处理这个问题，可以通过名字来访问容器吗？

```shell
$ docker exec -it tomcat02 ping tomcat01
ping: tomcat01: Name or service not known

# 通过--link可以解决网络连接问题
$ docker run -d -P --name tomcat03 --link tomcat02 tomcat
6aedb0ba2e798b184f42f98e4a38ce2a54cb97d47b985d17065b064a7f73d404
$ docker exec -it tomcat03 ping tomcat02
PING tomcat02 (172.17.0.3) 56(84) bytes of data.
64 bytes from tomcat02 (172.17.0.3): icmp_seq=1 ttl=64 time=0.061 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=2 ttl=64 time=0.040 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=3 ttl=64 time=0.040 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=4 ttl=64 time=0.082 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=5 ttl=64 time=0.039 ms
^C
--- tomcat02 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 134ms
rtt min/avg/max/mdev = 0.039/0.052/0.082/0.018 ms

# 反向是否可以ping通吗
[root@CZP ~]# docker exec -it tomcat02 ping tomcat03
```

-link **本质就是在hosts中添加映射**

我们现在玩Docker已经不建议使用–link了!

自定义网络,不使用docker0!

docker0问题: 它不支持容器名连接访问!

### 自定义网络

> 查看所有的docker网络

```shell
$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
86c70406cec4        bridge              bridge              local
e2cd35c81ffb        host                host                local
c6fe6b78ab62        none                null                local
```

**网络模式**

bridge: 桥接模式 docker 搭桥（默认）

none： 不配置网络

host：和宿主机共享网络

container: 容器内网络连通（用得少，局限很大）

```shell
# 直接启动的命令 --net brodge,默认docker0
docker run -d -P --name tomcat01 --net bridge tomcat

# docker0的特点: 默认的,域名是不能访问的, --link可以打通连接

# 自定义网络
# --driver bridge
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet
87d0f163b3a0c857d281bf4e97675d03555486c530969d1cb04950f203133b55

$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
86c70406cec4        bridge              bridge              local
e2cd35c81ffb        host                host                local
87d0f163b3a0        mynet               bridge              local
c6fe6b78ab62        none                null                local
```

自己的网络创建好了

```shell
$ docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "87d0f163b3a0c857d281bf4e97675d03555486c530969d1cb04950f203133b55",
        "Created": "2020-07-08T01:56:39.0611734Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]

$ docker run -d -P --name tomcat-net-01 --net mynet tomcat
f8acd6bd8a21c27ca293d4c2d150448299192bd1f58b41d273d61d24cfe7d9a8

$ docker run -d -P --name tomcat-net-02 --net mynet tomcat
84b8b3a4a45c579eb479dfa036bc6e88f2c4ea5a0e8edd0c8f225bddebb2747c

$ docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "87d0f163b3a0c857d281bf4e97675d03555486c530969d1cb04950f203133b55",
        "Created": "2020-07-08T01:56:39.0611734Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "84b8b3a4a45c579eb479dfa036bc6e88f2c4ea5a0e8edd0c8f225bddebb2747c": {
                "Name": "tomcat-net-02",
                "EndpointID": "889a15d10cf311193a18033af3a75eefa6a074291e84aab65e9d88f4b9889bf2",
                "MacAddress": "02:42:c0:a8:00:03",
                "IPv4Address": "192.168.0.3/16",
                "IPv6Address": ""
            },
            "f8acd6bd8a21c27ca293d4c2d150448299192bd1f58b41d273d61d24cfe7d9a8": {
                "Name": "tomcat-net-01",
                "EndpointID": "810c98a4ee532167410f1bc28acbc1d3aac11390e7c5a0c0864c20832bf06fb6",
                "MacAddress": "02:42:c0:a8:00:02",
                "IPv4Address": "192.168.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]

# 再次测试ping连接
$ docker exec -it tomcat-net-01 ping 192.168.0.3
PING 192.168.0.3 (192.168.0.3) 56(84) bytes of data.
64 bytes from 192.168.0.3: icmp_seq=1 ttl=64 time=0.056 ms
64 bytes from 192.168.0.3: icmp_seq=2 ttl=64 time=0.156 ms
64 bytes from 192.168.0.3: icmp_seq=3 ttl=64 time=0.086 ms
64 bytes from 192.168.0.3: icmp_seq=4 ttl=64 time=0.037 ms
^C
--- 192.168.0.3 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 162ms
rtt min/avg/max/mdev = 0.037/0.083/0.156/0.046 ms
# 现在不使用--link也可以ping容器名字
$ docker exec -it tomcat-net-02 ping 192.168.0.2
PING 192.168.0.2 (192.168.0.2) 56(84) bytes of data.
64 bytes from 192.168.0.2: icmp_seq=1 ttl=64 time=0.039 ms
64 bytes from 192.168.0.2: icmp_seq=2 ttl=64 time=0.066 ms
^C
--- 192.168.0.2 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 47ms
rtt min/avg/max/mdev = 0.039/0.052/0.066/0.015 ms
```

自定义网络docker都帮我们维护好了对应关系，推荐平时这样使用网络！

好处:

不同的集群使用不同的集群,保证集群之间是安全和健康的

### 网络连通

![image-20200720164144037](https://i.loli.net/2020/07/20/DKgzSZ2xc4LXoqY.png)

![image-20200720164243586](https://i.loli.net/2020/07/20/lrGh3epJAs1ntXx.png)

```shell
#测试打通 tomcat01到tomcat-net-01
$ docker network connect mynet tomcat01
# 连通之后就是将 tomcat01 放到了mynet网络下
# 一个容器两个ip   阿里云: 公网ip 私网ip
```

```shell
# 01 连通ok
$ docker exec -it tomcat01 ping tomcat-net-01
PING tomcat-net-01 (192.168.0.2) 56(84) bytes of data.
64 bytes from tomcat-net-01.mynet (192.168.0.2): icmp_seq=1 ttl=64 time=0.087 ms
64 bytes from tomcat-net-01.mynet (192.168.0.2): icmp_seq=2 ttl=64 time=0.065 ms
^C
--- tomcat-net-01 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 71ms
rtt min/avg/max/mdev = 0.065/0.076/0.087/0.011 ms

# 02 依旧是连不通的
$ docker exec -it tomcat02 ping tomcat-net-01
ping: tomcat-net-01: Name or service not known
```

结论：要跨网络操作别人，就需要使用 **docker network connect** 连通