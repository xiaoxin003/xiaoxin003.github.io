---
categories:
 - [React, README]
tags:
 - React
---
## 简介
- 起源于Facebook的内部项目，因为该公司对市场上所有JavaScript MVC框架都不满意，就决定自己写一套，用来架设instagram（照片交友）的网站，做出来以后，发现这套东西很好用，就在2013年5月开源了
- Angular2009年 谷歌 MVC不支持组件化开发
- 由于React的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单，所以越来越多的人开始关注和使用，认为它可能是将来web开发的主流工具。
- 清楚两个概念
  + library（库）：小而巧；可以很方便的从一个库切换到另外的库，但是代码几乎不会改变
  + Framework（框架）：大而全；提供了一整套的解决方案，所以如果在项目的中间，想切换到另外的框架，是比较困难的

## 前端三大主流框架
- Angular.js
  出来较早的前端框架，学习曲线比较陡，NG1学起来比较麻烦，NG2-NG5开始，进行了一系列的改革，也提供了组件化开发的概念；从NG2开始，也支持使用TS（TypeScript）进行编程
- Vue.js
  最火的一门前端框架，他是中国人开发的，对我们来说，文档要友好一些
- React.js
  最流行的一门框架，因为它的设计很优秀
  
## React与Vue的对比
- 组件化方面
  + 模块化：是从代码的角度来进行分析的。把一些可复用的代码抽离成单个的模块，便于项目的维护和开发
  + 组件化：是从UI界面的角度来进行分析的。把一些可复用的UI元素抽离为单独的组件
  + 组件化的好处：随着项目规模的增大，手里的组件越来越多，很方便就能把现有的组件拼接成一个完整的页面
  + Vue是如何实现组件化的：通过.vue文件来创建对应的组件
    * template-结构
    * script-行为
    * style-样式
  + React是如何实现组件化的
    * React中有组件化的概念，但是并没有像vue这样的组件模板文件
    * React中，一切都是以JS来表现的
- 开发团队方面
  + React是由Facebook前端官方团队进行维护和更新的；因此，React的维护开发团队技术实力比较雄厚
  + Vue，第一版主要是由作者尤雨溪专门进行维护的，当Vue更新到2.x版本后，也有了一个以尤雨溪为主导的开源小团队，进行相关的开发和维护
- 社区方面
  + React由于诞生的较早，所以社区比较强大，一些常见的问题、坑、最优解决方案、文档、博客在社区中都是可以很方便就能找到
  + Vue是近两年才火起来的，所以，其社区相对比于React要小一些，可能有的坑没人踩过
- 移动App开发体验方面
  + Vue，结合Weex这门技术，提供了迁移到移动端App开发的体验（Weex目前只是一个小的玩具，并没有很成功的大案例）
  + React，结合ReactNative，也提供了无缝迁移到移动App的开发体验（RN用的最多，也是最火最流行的）

## 为什么要学习React
- 和Angular1相比，React设计很优秀，一切基于JS并且实现了组件化开发的思想
- 开发团队实力强悍，不必担心断更的情况
- 社区强大，很多问题都能找到对应的解决方案
- 提供了无缝转到ReactNative上的开发体验，让我们技术能力得到了扩展，增强了核心竞争力
- 很多企业中，前端项目的技术选型采用的是React.js

## React中几个核心的概念
- 虚拟DOM(Virtual Document Object Model)
  + DOM的本质是什么
    浏览器中的概念，用js对象来表示页面上的元素，并提供了操作DOM对象的API
  + 什么是虚拟DOM
    框架中的概念，是程序员用js对象来模拟页面上的DOM和DOM嵌套
  + 为什么要实现虚拟DOM
    为了实现页面中的DOM元素的高效更新
  + DOM和虚拟DOM的区别
    * DOM：浏览器中提供的概念，用js对象表示页面上的元素，并提供了操作元素的API
    * 虚拟DOM：框架中的概念。是开发框架的程序员手动用js对象来模拟DOM元素和嵌套关系
    本质：用js对象来模拟DOM元素和嵌套关系
    目的：为了实现页面元素的高效更新
- Diff算法
  + tree diff
    新旧两棵DOM树，逐层对比的过程就是Tree Diff；当整棵DOM逐层对比完毕，则所有需要被按需更新的元素，必然能够找到
  + component diff
    在进行Tree Diff的时候，每一层中，组件级别的对比叫做component Diff
    * 如果对比前后，组件的类型相同，则暂时认为此组件不需要被更新
    * 如果对比前后，组件类型不同，则需要移除旧组件，创建新组件，并追加到页面上
  + element diff
    在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做element diff

## 创建基本的webpack4.x项目
1.运行`npm init -y`快速初始化项目
2.在项目根目录创建src源代码目录和dist产品目录
3.在src中创建index.html和main.js
4.需要全局安装webpack、webpack-cli。运行`npm i webpack webpack-cli -g`
5.项目中使用npm安装webpack，运行`npm i webpack webpack-cli -D`
6.注意：webpack4.x提供了约定大于配置的概念：目的是为了尽量减少配置文件的体积
  - 默认约定了：打包的入口是`src`->`index.js`
  - 打包的输出文件是`dist`->`main.js`
  - 4.x中新增了mode选项（必选项）development/production
7.`npm i webpack-dev-server -D`运行后，在package.json中的scripts里增加命令，`"dev":"webpack-dev-server`起服务，并且实时更新打包main.js。webpack-dev-server打包好的main.js是托管到了内存中，所以在项目根目录中看不到。可以设置参数，如下：`"dev":"webpack-dev-server --open firefox --port 3000 --hot --progress --compress --host 127.0.0.1`
8.安装`npm i html-webpack-plugin -D`:帮我们把页面生成到内存中去
  在webpack.config.js中配置
  ``` javascript
  const path = require('path')
  //导入 在内存中自动生成index.html页面的插件
  const HtmlWebPackPlugin = require('html-webpack-plugin')
  //创建一个插件的实例对象
  const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname,'src/index.html'),//源文件
    filename:'index.html'//生成的内存中首页的名称
  })
  module.exports = {
      mode: 'development',
      plugins:[
          htmlPlugin   //在这儿加入htmlPlugin
      ]
  }
  ```













