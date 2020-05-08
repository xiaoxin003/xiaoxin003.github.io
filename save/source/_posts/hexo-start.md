---
categories:
  - HEXO
    - START
tags:
  - HEXO
---
[hexo文档](https://hexo.io/zh-cn/docs/)



## 搭建个人博客

- npm install -g hexo-cli

  安装hexo包

### 以下命令都是在blog路径下运行

- sudo hexo init

  以管理员的身份初始化hexo

- hexo s

  启动hexo（本地预览）

- hexo n "my first blog"

  new一个新博客文章

  
  
  安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。
  
  ```
  $ hexo init <folder>
  $ cd <folder>
  $ npm install
  ```
  
  新建完成后，指定文件夹的目录如下：
  
  ```
  .
  ├── _config.yml
  ├── package.json
  ├── scaffolds
  ├── source
  |   ├── _drafts
  |   └── _posts
  └── themes
  ```
  
  

### VIM编辑器的命令

#### 1.简介
　　vim是linux最常用的编辑器，必须要熟练掌握使用办法，方便以后快速修改配置文件。如果想学习linux，vim编辑器是必须会用的工具。
　　vim有3种常用模式：一般模式、编辑模式、命令模式。

#### 2.一般模式
　　上下左右:kjhl 也可以使用方向键
　　n+上下左右:n为数字，向上下左右移动n个字符
　　[ctrl]+f:屏幕向下滚动一页，同page down
　　[ctrl]+b:屏幕向上滚动一页，同page up
　　0或home:光标移动到行首
　　`$`或end:光标移动到行尾
　　g:光标移动到最后一行
　　ng:光标移动到第n行
　　gg:同1g，光标移动到第一行行首
　　/word:向下查找关键词，使用n或N向上或向下查找关键词
　　?word:向上查找关键词word，使用n或N向上或向下查找关键词
　　:n1,n2s/word1/word2/g  :  s/1/2/g 表示将1替换成2，所以前面的意思是在n1到n2之间，将word1替换为word2.例如：51,100s/aaa/bbb/g
　　:1,`$`s/word1/word2/g : 全文查找替换将word1替换为word2
　　x:向后删除
　　X:向前删除
　　nx:向后删除n个字符
　　dd:删除当前行　
　　ndd:向下删除n行
　　d1G:删除当前位置到第一行
　　d$:删除当前位置到最后一行
　　d0:删除当前位置到改行第一个字符的所有数据
　　yy:复制光标所在的这一行
　　nyy:向下复制n行
　　p:在光标所在行的下面粘贴复制的数据
　　P:在光标所在行的上面粘贴复制的数据
　　u:恢复前一个操作
　　[ctrl]+u:重做上一个操作

#### 3.一般模式切换到编辑模式
　　i:进入插入模式，在光标前插入  I是在第一个非空格符处插入
　　a:进入插入模式，在光标下一个字符插入 A是在所在行最后一个字符插入
　　o:进入插入模式，在下面一行插入  O是在上面一行出入
　　r:进入替换模式，类似于insert键

#### 4.一般模式到命令模式
　　:w 保存
　　:w! 强制保存
　　:q 退出
　　:q! 强制退出
　　:wq :x 保存并退出
　　ZZ 保存并退出
　　:set number 显示行号
　　:set nonu 取消显示行号
　　

#### 5. 多文件编辑
　　vim file1 file2可以同时打开两个文件
　　:n 编辑下一个文件
　　:N 编辑上一个文件
　　:file 列出这个vim打开的所有文件



## 将博客部署到github上

- 创建仓库，名字固定为.github.io结尾(用户部署个人博客的github仓库的命名必须符合特定要求)

- 将博客部署到github上

  + 配置_config.yml中的#Deployment

    deploy:

      type: git

      repo: 'github仓库地址'

      branch: master

  + 部署到远端

    hexo d

  + 访问

    在浏览器中访问仓库名

  

  

- 更改博客的主题