---
categories:
  - [HEXO, START]
tags:
  - HEXO
---
[hexo文档](https://hexo.io/zh-cn/docs/)

基于[Nunjucks](https://github.com/mozilla/nunjucks)模板引擎
- 如何从根本解决hexo不兼容{{}}标签问题 [ Keep Coding ]
  + https://www.dazhuanlan.com/2020/01/30/5e322259a87e5/


## 搭建个人博客

- npm install -g hexo-cli

  安装hexo包

### 在根目录下创建blog文件夹，以下命令都是在blog路径下运行

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

    在浏览器中访问仓库名，例如：https://xiaoxin003.github.io/

## 将博客部署到gitee上

- 创建仓库，名字固定为个人空间的地址名称

- 将博客部署到gitee上

  + 配置_config.yml中的#Deployment(如下，可以设置多个仓库进行部署)

    deploy:
      - type: git
        repo: https://gitee.com/xiaoxin1993/xiaoxin1993
        branch: master
      - type: git
        repo: https://github.com/xiaoxin003/xiaoxin003.github.io.git
        branch: master

  + 部署到远端

    hexo d
    gitee还需要开启Gitee Pages服务，每次hexo d之后，手动更新一下

  + 访问

    在浏览器中访问仓库名，例如： https://xiaoxin1993.gitee.io/

## 更改博客的主题
以hexo-theme-butterfly为例：
- 根据butterfly的文档一步步进行安装
- 将站点的_config.yml的theme更改为Butterfly，即可

## Hexo+Butterfly集成Algolia搜索
根据站点的配置文件中配置的站点的url去搜索：由于Github是国外服务器，速度慢。所以站点配置的是Gitee码云
- 注册Algolia账户：https://www.algolia.com/
- 创建index，之后，在站点根目录，指令命令`npm install hexo-algolia --save`
- 获取Key，更新站点根目录配置
  ```
  algolia:
  applicationID: 'EMXSTUCH7A'
  apiKey: '5e62a2c8d04b2e5a21e6bb491c9bf2f9'
  indexName: 'blog'
  ```
- Algolia搜索ACL（访问控制列表）
![新增API Keys，如图配置ACLs](https://gitee.com/xiaoxin1993/imgs/raw/master/blog/other/algolia.png)
- 操作完成后执行命令
  ```
  export(windows 为 set) (Powershell 用 $env:) HEXO_ALGOLIA_INDEXING_KEY=你的Search-Only API key
  set (Mac和git bash 为 export) (Powershell 用 $env:) HEXO_ALGOLIA_INDEXING_KEY 
  
  #查看是否设置成功如果没有值就设置失败
  export HEXO_ALGOLIA_INDEXING_KEY=ad8621998734521248772996b97271f7
  hexo algolia
  ```
- 成功后修改Butterfly主题配置文件
  将algolia_search的enable设置为true即可

## Butterfly主题配置的PWA（其他配置，查看butterfly文档）
配置PWA特性，需要如下几步：
1. 打开hexo工作目录
2. `npm install hexo-offline --save`或者`yarn add hexo-offline`
3. 修改站点_config.yml，增加如下内容
  ```
  # offline config passed to sw-precache.
  offline:
    maximumFileSizeToCacheInBytes: 10485760 # 緩存的最大文件大小，以字節為單位
    staticFileGlobs:
      - public/**/*.{js,html,css,png,jpg,gif,svg,webp,eot,ttf,woff,woff2}
    # 靜態文件合集，如果你的站點使用了例如webp格式的文件，請將文件類型添加進去。
    stripPrefix: public
    verbose: true
    runtimeCaching:
      # CDNs - should be cacheFirst, since they should be used specific versions so should not change
      - urlPattern: /* # 如果你需要加載CDN資源，請配置該選項，如果沒有，可以不配置。
        handler: cacheFirst
        options:
          origin: your_websie_url # 可替換成你的 url
  ```
4. 在`butterfly.yml`（站点的source/_data/butterfly.yml）中开启pwa选项,enable设置为true
5. 在站点的根目录下的source下创建manifest.json（hexo-offline自动生成service worker.js）
   ```
   {
    "name": "string",
    "version": "1.0",
    "manifest_version": 2,
    "icons": [{
        "src": "img/pwa/pwaicons/36.png",
        "sizes": "36x36",
        "type": "image/png"
      },
      {
        "src": "img/pwa/pwaicons/512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
    }
   ```

6. 可以通过Chrome插件Lighthouse检查PWA配置是否生效以及配置是否正确
  - 下载的扩展插件crx文件，更改为rar文件，再解压
  - 在chrome://extensions中导入解压文件

### 用新版Chrome把PWA网站添加到桌面
- 配置Chrome
  更新到版本64或以上。在地址栏输入`chrome://flags`，找到`Desktop PWAs`的选项将其`Enabled`，然后重启浏览器，PWA添加到桌面的特性就已经具备了
- 将PWA网站添加到桌面
  在浏览器右侧找到设置的按钮，点击：安装XXX
  出现确认框，点击添加。应用程序会看到相应图标的app
  你会发现打开了一个没有浏览器痕迹的网页，或者说是个应用——这就是 PWA 了。PWA 支持离线启动技术，即使在没网的情况下也能启动应用。不过在需要网络条件下才能发送的请求依然需要网络环境。
  

注意事项:
1. 如果是非 PWA 应用，也会有 添加到桌面 或者 添加到应用文件夹 的选项。不过当你双击打开它们的时候依然会调用 Chrome 浏览器去打开，跟以前的书签的作用无差别。
不过，依然可以通过一个小操作来实现。前置步骤跟之前说的一样，然后打开 chrome://apps 找到你制作的应用，然后右键，选择在窗口中打开。那么就能获得跟PWA应用单独窗口的类似体验。不过它是不具备PWA离线打开的能力哦，只是纯粹的一个网页通过独立窗口打开而已。
2. 目前 Desktop PWAs 还是实验性的功能，所以有可能出现不稳定的情况，依照自己的情况作出决定