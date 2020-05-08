---
categories:
  - VUE
    - VUE 2
tags:
  - VUE
---
## 模块化概述

### 传统开发模式的主要问题

- 命名冲突
- 文件依赖



### 通过模块化解决上述问题

- 模块化就是把单独的一个功能封装到一个模块（文件）中，模块之间相互隔离，但是可以通过特定的接口公开内部成员，也可以依赖别的模块
- 模块化开发的好处：方便代码的重用，从而提升开发效率，并且方便后期的维护



### 浏览器端模块化规范

- AMD

  Require.js

- CMD

  Sea.js



### 服务器端模块化规范

- CommonJS
  + 模块分为**单文件模块**与**包**
  + 模块成员导出：`module.exports` 和 `exports`
  + 模块成员导入：`require('模块标识符')`



### 大一统的模块化规范-ES6模块化

在ES6模块化规范诞生之前，JavaScript社区已经尝试并提出了AMD、CMD、CommonJS等模块化规范

但是，这些社区提出的模块化标准，还是存在一定的**差异性**与**局限性**，并不是浏览器与服务器**通用的模块化标准**，例如：

- AMD和CMD适用于浏览器端的Javascript模块化
- CommonJS使用与服务器端的Javascript模块化

因此，ES6语法规范中，在语言层面上定义了ES6模块化规范，是浏览器端与服务器端通用的模块化开发规范

ES6模块化规范中定义：

- 每个js文件都是一个独立的模块
- 导入模块成员使用`import`关键字
- 暴露模块成员使用`export`关键字



#### Node.js中通过babel体验ES6模块化

1. `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node`

2. `npm install --save @babel/polyfill`

3. 项目根目录创建文件babel.config.js

4. babel.config.js文件内容如下

   ```js
   const presets = [
   	["@babel/env",{
   		targets: {
   			edge: "17",
   			firefox: "60",
   			chrome: "67",
   			safari: "11.1"
   		}
   	}]
   ]
   module.exports = { presets }
   ```

5. 通过`npx babel-node index.js`执行代码



#### ES6模块化的基本语法

1. 默认导出与默认导入

   + 默认导出语法`export default`默认导出的成员

     ```js
     //当前文件模块为m1.js
     //定义私有成员a和c
     let a = 10
     let c = 20
     let d = 30//外界访问不到变量d，因为没有被暴露出去
     function show(){}
     
     //将本模块中的私有成员暴露出去，供其他模块使用
     export default {
     	a,
     	c,
     	show
     }
     ```

   + 默认导入语法`import 接收名称 from '模块标识符'`

   注意：每个模块中，只能使用一次export default，否则会报错

2. 按需导出与按需导入

   + 按需导出语法export let s1 = 10

   + 按需导入语法import { s1 } from '模块标识符'

     ```
     //index.js
     //导入模块成员
     import m, {
         s1 as ss1   // {}按需导入，as起别名
     } from './m.js'
     console.log(m) //输出的默认导出export default
     console.log(ss1)
     
     //m.js
     //向外按需导出变量
     export let s1 = 1
     export let s2 = 2
     ```

     注意：每个模块中，可以使用多次按需导出

3. 直接导入并执行模块代码

   有时候，我们只想单纯执行某个模块中的代码，并不需要得到模块中向外暴露的成员，此时，可以直接导入并执行模块代码

   ```js
   //m.js
   
   //在当前模块中执行一个for循环操作
   for(let i = 0;i<3;i++){
   console.log(i)
   }
   
   //index.js
   //直接导入并执行模块代码
   import './m.js'
   ```

   

