---
categories:
  - [Node.js, notes, 模块系统]
tags:
  - Node.js
---
## 使用Node编写应用程序主要就是在使用：

- ECMAScript语言
  + 和浏览器不一样，在Node中没有BOM、DOM
- 核心模块
  + 文件操作的fs
  + http服务的http
  + url路径操作模块
  + path路径处理模块
  + os操作系统信息
- 第三方模块
  + art-template
  + 必须通过npm下载才可以使用
- 自己写的模块
  + 自己创建的文件

## 什么是模块化

- 文件作用域
- 通信规则
  + 加载 require
  + 导出 exports

## Commonjs模块规范

在Node中的js有一个很重要的概念：模块系统

- 模块作用域
- 使用require方法来加载模块
- 使用exports接口对象来导出模块中的成员

### 加载`require`
语法：
`var 自定义变量名称 = require('模块')`
两个作用：
- 执行被加载模块中的代码
- 得到被加载模块中的`exports`导出接口对象

### 导出`exports`
- Node中是模块作用域：默认文件中所有的成员只在当前文件模块有效

- 对于希望可以被其他模块访问的成员，我们就需要把这些公开的成员都挂载到`exports`对象上

  导出多个成员（必须在对象中）：

``` javascript
exports.a = 123
exports.b = 'hello'
exports.c = function(){
  console.log('ccc')
}
exports.d = {
  foo: 'bar'
}
```

- 如果一个模块需要直接导出某个成员，而非挂载的方式。那这个时候必须使用下面这种方式
  
  + module.exports = 'hello'
  
  导出单个成员：
  
  ``` JavaScript
  module.exports = 'hello'
  ```
  
  以下情况会覆盖：
  
  ``` javascript
  module.exports = 'hello'
  
  // 以这个为准，后者会覆盖前者
  module.exports = function(x,y){
    return x+y
  }
  ```
  
  也可以这样来导出多个成员：
  
  ``` javascript
  module.exports = {
    add: function(){},
    str: 'hello'
  }
  ```
  
  ==原理==
  
  在Node中，每个模块内部都有一个module对象，该对象中，有一个成员叫exports对象，默认在代码的最后有一句return module.exports，也就是说需要对外导出成员，只需要把导出的成员挂载到module.exports中
  
  我们发现每次导出成员时都需要module.exports.XXX很麻烦，所以node为了简化操作，专门提供了一个变量`var exports=module.exports`，**默认在代码的最后有一句：return module.exports**，不是exports，所以给exports重新赋值不管用。
  
  ==exports是module.exports的引用==// 可以通过任意一方来导出成员
  
  `exports === module.exports` //true
  
  // 给exports重新赋值或者给module.exports重新赋值都会断开引用（指向问题）
  
  ``` javascript
  var obj1 = {}
  var obj2 = obj1
  obj1 = {
    obj1: 1
  }
  console.log(obj2) // {}
  ```
  
### require方法加载规则
- 核心模块
  
  + 模块名 require('fs')
  
  + 非路径形式的模块 是核心模块标识
  
    // 已经被编译到了二进制文件中了，只需要按照名字来加载

- 用户自己写的
  
  + 路径 require('./a')
  
  + 路径形式的模块
    //  首位的/在这里指的是当前文件模块所属磁盘根路径 
    // ./和../不可省略，其中./指的是当前目录 ../指的是上一级目录
  
    // .js后缀名可以省略
- 第三方模块
  
  + 模块名 require('art-template')
  + 通过npm来下载
  + 通过require('包名')来进行加载使用
  + 不可能有任何一个第三方包和核心模块的名字是一样的
查找规则：既不是核心模块，也不是路径模块。先找到当前文件所属目录的node_modules目录，然后找node_modules/art-template，再去找node_modules/art-template/package.json文件，再去找node_modules/art-template/package.json文件中的main属性，main属性中记录了art-template的入口模块，然后加载使用这个第三方包。实际上加载的还是文件（如果没有package.json或者main指定的入口模块是错的，那么node会自动加载当前目录下的index.js，即index是默认备选项。）如果以上所有条件都不成立，则会进入上一目录中的node_modules目录中查找，直到当前磁盘根目录还找不到，则会报错can not find module XXX

- 优先从缓存加载
``` JavaScript
  //a.js
  console.log('a被执行')
  require('./b')
```
``` JavaScript
  //b.js
  console.log('b被执行')
```
``` JavaScript
  //main.js
  require('./a')
  require('./b')
```
**优先从缓存加载，由于在a中已经加载过b了，所以在main中不会重复执行b里面的代码。直接从缓存中获取到接口对象**==目的是为了避免重复加载，提交模块加载效率==
[深入浅出Node.js](https://www.infoq.cn/article/nodejs-module-mechanism/)

**模块查找机制：**

- 优先从缓存中加载
- 核心模块
- 路径形式的文件模块
- 第三方模块

## npm

- node package manager
- `npm install art-template --save`或者`npm install --save art-template`指令会存到package.json的dependencies依赖对象中

### npm网站
npmjs.com
### npm命令行工具
- 查版本：npm --version
- 升级：npm install --global npm
- 常用命令
  + npm init
    * npm init -y可以跳过向导，快速生成
  + npm install
    * 一次性把dependencies选项中的依赖项全部安装
    * npm i
  + npm install 包名
    * 只下载
    * npm i 包名
  + npm install --save 包名
    * 下载并保存依赖
    * npm i -S 包名
  + npm uninstall 包名
    * 只删除，如果有依赖项，会依然保存
    * npm un 包名
  + npm uninstall --save 包名
    * 删除的同时也会把依赖信息删除
    * npm un -S 包名
  + npm help
    * 查看使用帮助
    * npm help
  + npm 命令 --help
    * 查看指定命令的使用帮助
    * 例如忘记了uninstall命令的简写了，可以输入`npm uninstall --help`来查看
### 解决npm被墙问题
npm存储包文件的服务器在国外，有时候会被墙，速度很慢：cnpm
安装淘宝的cnpm(npm.taobao.org)
`npm install --global cnpm`
接下来你安装包的时候把之前的npm替换成cnpm
如果不想安装cnpm又想使用淘宝的服务器来下载
`npm install jquery --registry=https://registry.npm.taobao.org`
每次手动加参数很麻烦，所以可以把他加入到配置文件中
`npm config set registry https://registry.npm.taobao.org`
只要经过了上面命令的配置，则以后的`npm install`都会默认通过淘宝的服务器来下载
查看npm配置信息
`npm config list`
## package.json和package-lock.json

建议每个项目都要有一个`package.json`文件：包描述文件

npm init自动生成该文件

npm5以前是不会有`package-lock.json`这个文件的

npm5以后才有了`package-lock.json`这个文件的

当你安装包的时候，npm会生成或更新package-lock.json

- npm5以后的版本不需要加--save，会自动保存依赖信息
- `package-lock.json`会保存`node_modules`中所有包的信息（版本、下载地址）
  + 这样的话，重新`npm install`速度会提升
- 从文件来看，有一个`lock`锁
  + 用来锁定版本
  + 如果项目依赖了1.1.1版本，重新install其实会下载最新版本，而不是1.1.1。我们的目的是希望可以锁住1.1.1这个版本。所以这个文件的作用是锁定版本号，防止自动升级新版













