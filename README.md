# 写作

###### 创建草稿(`drafts`)

```
$ hexo new draft "new-blog"
# INFO  Created: ~/blog/source/_drafts/new-blog.md
```

###### 将新建的文件保存到草稿箱，写作完之后，进行预览

```
$ hexo s -p 9000 --draft
# INFO  Start processing
# INFO  Hexo is running at http://localhost:9000 . Press Ctrl+C to stop.

# 如果需要退出服务器，按住 control + c
```

###### 发布草稿(`publish`)

```
hexo publish post new-blog
```

##### 发布

```
git push
```
 