---
categories:
  - [Node.js, 准备]
tags:
  - Node.js
---
#为什么要学习Node.js

-企业需求

​	+ 具有服务端开发经验

	+ front-end
	
	+ back-end
	+ 全栈开发工程师
	+ 基本的网站开发能力

#学习Nodejs的目的：打开服务端这个黑盒子

# #Node.js是什么

1.Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).

Node.js不是一门语言

Node.js不是库、不是框架

--Node.js是一个Javascript运行时环境

--简单来说就是Node.js可以解析和执行javascript代码

以前只有浏览器可以解析执行javascript代码

现在的Javascript可以完全脱离浏览器来执行，一切都归功于Node.js

2.浏览器中的js

ECMAscript（基本的语法）、BOM、DOM

3.Nodejs中的Javascript ： 

--没有BOM、DOM

--ECMAscript

--在Node这个js执行环境中为js提供了一些服务器级别的操作api（文件读写、网络服务的构建、网络通信、http服务器等等）

--构建于Chrome的V8引擎之上

代码只是特定的字符串

引擎认识代码，可以帮助解析和执行

Chrome的V8引擎是目前公认的解析执行Javascript最快的

Nodejs的作者把Chrome中的V8引擎移植了出来，开发了一个独立的javascript运行时环境

4.Node.js uses an event-driven.non-blocking I/O model that makes it lightweight and efficient.

--event-driven事件驱动

--non-blocking I/O model非阻塞IO模型（异步）

--lightweight and efficient轻量和高效

5.Node.js package ecosystem,npm is the largest ecosystem of open source libraries in the world.

--npm是世界上最大的开源库生态系统

--绝大多数js相关的包都存到npm上，这样做的目的是为了让开发人员更方便的去下载使用

--npm install jquery

# #Node.js能做什么

--Web服务器后台

--命令行工具

​	npm（node）

​	git   （c语言）

​	hexo（node）

--对于前端开发工程师来讲，接触node最多的就是他的命令行工具（自己写的很少，主要是使用第三方开发的）

- webpack
- gulp
- npm

# #预备知识

- HTML

- CSS

- Javascript

- 简单的命令行操作

  cd

  dir

  ls

  mkdir

  rm

- 具有服务端开发经验更佳

# #一些资源

- 《深入浅出Node.js》
  -   朴灵
  - 偏理论，几乎没有任何实战性内容
  - 理解原理底层有帮助
  - 结合课程的学习去看
- 《Node.js权威指南》
  -   API讲解
  - 没有业务，没有实战
- javascript标准参考教程（alpha）：https://javascript.ruanyifeng.com/
- Node入门：https://www.nodebeginner.org/index-zh-cn.html
  - **推荐**
- 官方API文档：https://nodejs.org/en/docs/
- 中文文档（版本较旧，凑合看）：http://www.nodeclass.com/api/node.html
- CNODE社区：https://cnodejs.org/
- CNODE新手入门：https://cnodejs.org/getstart

# #这门课能学到啥

- B/S编程模型
  1. Browser-Server
  2. back-end
  3. 任何服务端技术这种BS模型都是一样的，和语言无关
  4. Node只是作为学习BS模型的工具
- 模块化编程
  1. RequireJs
  2. SeaJs
  3. `@import('文件路径')`
  4. 以前认知的js只能通过script标签来加载
  5. 在node中可以像`@import()`一样来引用加载文件
- Node常用API
- 异步编程
  1. 回调函数
  2. Promise
  3. async
  4. generator
- Express开发框架
- ECMAscript 6
  1. 新的语法
- 学习Node不仅会帮助打开服务器端黑盒子，同时会帮助学习以后的前端高级内容
  1. Vue
  2. React
  3. Angular





