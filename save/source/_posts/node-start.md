---
categories:
  - [Node.js, 起步]
tags:
  - Node.js
---
# 起步

## 1.安装Node环境

- 打开命令行，输入node  --version 查看当前Node环境的版本号
- 下载：node官网
- 安装
- 确认Node环境安装成功
- 环境变量

## 2.Hello World

- 创建编写js脚本文件

- 打开终端，定位到文件目录

- 输入node 文件名，执行文件

  

  1. 解析执行js
  2. 读写文件
  3. http

nodejs中的js具有文件操作的能力

fs是file-system的简写，就是文件系统

在Nodejs中如果想要进行文件操作，就必须引入fs这个核心模块

例如：fs.readFile就是用来读取文件的

1. 使用require方法加载fs核心模块

   `var fs = require('fs')`

2. 读取文件

   第一个参数是要读取的文件路径；第二个参数是回调函数，其中参数error、data

   成功：data数据 error null

   失败：data undefined没有数据   error 错误对象

   ```javascript
fs.readFile('./README.md',function(error, data){
   /*<Buffer 79 6f 75 20 72 65 61 64 20 6d 65>
文件中存储的其实都是二进制数据 0 1
   这里为什么看到的不是0和1呢 ？是因为二进制转为十六进制了
但是无论是二进制还是十六进制，人类都不认识
   所以可以通过toString方法把其转为我们能认识的字符*/
	console.log(data.toString())
   })
   ```

## 3.Node中的Javascript

- ECMAscript

  没有DOM、BOM

## 4.Node中的模块系统

- 核心模块

  Node为js提供了很多服务器级别的API，这些API绝大多数都被包装到了一个具名的核心模块中了 例如：文件操作的fs核心模块、http服务构建的http模块、path路径操作模块、os操作系统信息模块等

  var fs = require('fs')

- 用户自定义模块

  require

  exports

  ```javascript
  //a.js
  /*简单的模块化
  * require是一个方法
  * 他的作用就是用来加载模块的
  * 在Node中，模块有三种：具名的核心模块，如fs、http；用户自己编写的文件模块*/
  require('./b.js')
  require('./b')//推荐此写法
  //用户自己编写的文件模块 相对路径必须加./  不能省略，否则报错
  //后缀名.js可以省略
  ```
  
  ```javascript
  //b.js
  console.log('执行b')
  ```

  **<u>在Node中没有全局作用域，只有模块作用域（即文件作用域），外部访问不到内部，内部也访问不到外部</u>**

既然是模块作用域，那如何让模块与模块之间进行通信。有时候我们加载文件模块的目的不是为了仅仅运行文件，而是为了使用文件中的方法

  ```javascript
  //模块加载与导出，实现模块间的通信
  //a.js
  /*require方法有两个作用
    1.加载文件模块并执行里面的代码
    2.拿到被加载文件模块导出的接口对象
    在每个文件模块中都提供了一个对象exports（默认是一个空对象）
    要做的就是把所有需要被外部访问的成员放到exports对象中
  */
  require('./b')
  
  ```

  ```javascript
  //b.js
  var foo = 'Hello'
  exports.foo = foo
  ```

- 第三方模块

## 5.IP地址和端口号的概念

所有联网的程序都需要进行网络通信

计算机中只有一个物理网卡，而且同一个局域网中，网卡的地址必须是唯一的

网卡是通过唯一的ip地址来进行定位的

1. ip地址用来定位计算机
2. 端口号用来定位具体的应用程序（所有需要联网通信的软件都会占用一个端口号）
3. 端口号的范围0-65536之间
4. 在计算机中有一些默认的端口号，最好不要去使用，例如http服务的80
5. 我们在开发过程中使用一些简单好记的即可，例如3000、5000等
6. 可以同时开启多个服务，但一定要确保不同服务占用的端口号不一致才可以（在一台计算机中，同一个端口号同一时间只能被一个程序占用）

## 6.在Node中使用模板引擎

统一处理静态资源

- art-template：不仅可以在浏览器中使用，也可以在Node中使用

  - 安装：npm install art-template

    - 该命令在哪执行就会把包下载到哪里，默认会下载到node_modules目录中
    - node_modules不要改，也不支持改

  - 在浏览器中需要引用lib/template-web.js文件

    ==模板引擎不关心你的字符串内容，只关心自己能认识的模板标记语法{{}}，即mustache语法==

  - 在Node中使用art-template模板引擎

    - 模板引擎最早就是诞生于服务器领域，后来才发展到了前端
    - 查文档，使用模板引擎的API
    - 加载方法  var template = require('art-template')

## 7.服务端渲染

使用模板引擎解析替换html页面，利于SEO搜索引擎优化

+ 服务端渲染和客户端渲染

  - 客户端渲染（最少请求两次。第一次请求拿到的是页面，第二次请求拿到的是动态数据）
    1. 收到服务端响应的字符串了
    2. 从上到下一次解析，在解析的过程中，如果发现ajax请求，则再次发起新的请求
    3. 发请求
    4. 拿到ajax响应结果
    5. 模板引擎渲染
  - 服务端渲染（只请求了一次。响应的就是最终的结果，客户端不需要再做处理）
    1. 读取index.html
    2. 模板引擎渲染。在发送给客户端之前，在服务端就已经把index.html渲染处理了

  服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的

  真正的网站既不是纯异步也不是纯服务端渲染出来的，而是两者结合来做的

  例如京东的商品列表就采用的是服务端渲染，目的是为了SEO搜索引擎优化；而他的商品评论列表为了用户体验，而且也不需要SEO优化，所以采用的是客户端渲染

## 8.代码风格

为了约定大家的代码风格，所以在社区中诞生了一些比较规范的代码风格规范
- [JavaScript Standard Style](https://standardjs.com/readme-zhcn.html)
- [Airbnb JavaScript Style](https://github.com/sivan/javascript-style-guide/blob/master/es5/README.md)  **推荐**

当你采用了无分号的代码风格的时候，只需要注意以下情况就不会有下面的问题了
==当一行代码是以( [ ` 开头的时候，则在前面补上一个分号以避免一些语法错误==

``` javascript
function say(){
	console.log('hello world')
}
say()	//TypeError: say() is not a function
(function(){
	console.log('hello')
})()
//当一行代码是以([`开头的时候，则在前面补上一个分号以避免一些语法错误
//会发现第三方插件的代码中都能看到一上来就以一个；开头
//无论代码风格是否有分号，都建议如果一行代码是以([`开头的，则最好都在其前面补上;
;(function(){
	console.log('hello')
})()
['苹果','香蕉'].forEach(function(item){
console.log(item)
})	//报错 
;['苹果','香蕉'].forEach(function(item){
console.log(item)
})
```

`是EcmaScript6中新增的一种字符串包裹方式，叫做：模板字符串。支持换行和非常方便拼接变量
``` javascript
var foo = `
  大家好
  hello
  world
`
`hello`.toString()//报错 改为	;`hello`.toString()
```

《编写可维护的JavaScript》

## 9.REPL

Read Eval Print Loop:交互式解释器。表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

在终端中输入`node`命令直接敲回车

Node 自带了交互式解释器，可以执行以下任务：

- **读取** - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
- **执行** - 执行输入的数据结构
- **打印** - 输出结果
- **循环** - 循环操作以上步骤直到用户两次按下 **ctrl-c** 按钮退出。

Node 的交互式解释器可以很好的调试 Javascript 代码。

## 10.文件操作路径和模块标识路径
- 文件操作中的相对路径可以省略./
- 模块标识中的相对路径中的./不能省略

## 11.异步编程
### 回调函数

函数是一种数据类型，既能当参数，也能当返回值

**凡是需要得到一个函数内部异步操作的结果**

- setTimeout
- readFile
- writeFile
- ajax

这种情况必须通过，回调函数

``` javascript
function add(x,y,callback){
  //callback就是回调函数
  //var x = 10
  //var y = 20
  //var callback = function(ret){console.log(ret)}
  
  setTimeout(function(){
    var ret = x + y
    callback(ret)
  },1000)
}

add(10,20,function(ret){
  console.log(ret)
})
```

JavaScript编程的一大特色：异步编程

### Promise

> [ECMAScript 6 入门](https://es6.ruanyifeng.com/)

起因- -〉callback hell:回调地狱

```  javascript 
//抛出异常
// 1.阻止程序的执行
// 2.把错误消息打印到控制台
throw err
```

为了解决回调地狱嵌套的问题，所以在ES6中新增了一个API：`Promise`

- Promise的英文就是承诺，保证的意思

#### 基本语法：

```javascript
var fs = require('fs')
/**
 * Promise是一个构造函数（Promise本身不是异步，但是内部往往封装一个异步任务）
 * 1.创建Promise容器
 *   Promise容器一旦创建，就开始执行里面的代码
 */
var p1 = new Promise(function(resolve,reject){
    fs.readFile('./a.txt','utf8',function(err,data){
        if(err){
            //失败了，承若容器中的任务失败了
            //把容器的Pending状态变为Rejected
            //调用了reject就相当于调用了then中的第二个参数
            reject(err)
        }else{
            //承诺容器中的任务成功了
            //把容器的Pending状态变为Resolved
            //也就是说，这里调用的resolve方法实际上就是then方法传递的那个function
            resolve(data)
        }
    })
})
//p1就是那个承诺
//当p1成功了，然后（then）做指定的操作
//then方法接收的function就是容器中的resolve函数
p1
    .then(function(data){
        console.log(data)
    },function(err){
        console.log('读取文件失败了')
    })

```

#### 基本用法

```javascript
var fs = require('fs')
/**
 * Promise是一个构造函数（Promise本身不是异步，但是内部往往封装一个异步任务）
 * 1.创建Promise容器
 *   Promise容器一旦创建，就开始执行里面的代码
 */
var p1 = new Promise(function(resolve,reject){
    fs.readFile('./a.txt','utf8',function(err,data){
        if(err){
            //失败了，承若容器中的任务失败了
            //把容器的Pending状态变为Rejected
            //调用了reject就相当于调用了then中的第二个参数
            reject(err)
        }else{
            //承诺容器中的任务成功了
            //把容器的Pending状态变为Resolved
            //也就是说，这里调用的resolve方法实际上就是then方法传递的那个function
            resolve(data)
        }
    })
})

var p2 = new Promise(function(resolve,reject){
    fs.readFile('./b.txt','utf8',function(err,data){
        if(err){
            reject(err)
        }else{
            resolve(data)
        }
    })
})
var p3 = new Promise(function(resolve,reject){
    fs.readFile('./c.txt','utf8',function(err,data){
        if(err){
            reject(err)
        }else{
            resolve(data)
        }
    })
})
//p1就是那个承诺
//当p1成功了，然后（then）做指定的操作
//then方法接收的function就是容器中的resolve函数和reject函数
p1
    .then(function(data){
        console.log(data)
        //当p1读取成功的时候
        //当前函数中，return的结果就可以在后面的then中function接收到
        //当return123后面就接收到123；return 的数据没什么用

        //当return一个Promise对象的时候,下一个then的参数是这个Promise对象的resolve和reject函数
        return p2
    },function(err){
        console.log('读取文件失败了')
    })
    .then(function(data){
        console.log(data)
        return p3
    })
    .then(function(data){
        console.log(data)
        console.log('end')
    })
```

#### 封装Promise版本的readFile

```javascript
var fs = require('fs')
function pReadFile(filePath){
    return new Promise(function(resolve,reject){
        fs.readFile(filePath,'utf8',function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
pReadFile('./a.txt')
    .then(function(data){
        console.log(data)
        return pReadFile('./b.txt')
    })
    .then(function(data){
        console.log(data)
        return pReadFile('./c.txt')
    })
```

#### Promise使用场景











## 12.模块作用域

可以使用API来进行文件与文件之间的依赖加载
在Node这个环境中对JavaScript进行了特殊的模块化支持CommonJS
- JavaScript天生不支持模块化
  + require
  + exports
  + Node.js才有
- 在浏览器中也可以像在Node中的模块一样来进行编程
  + `script`标签来引用加载，而且还必须考虑加载的顺序问题
  + require.js第三方库AMD
  + sea.js第三方库CMD
- 无论是CommonJS、AMD、CMD、UMD。ECMAScript6 Modules官方规范
  + 都是为了解决JavaScript的模块化问题
  + CommonJS、AMD、CMD都是民间搞出来的
  + ECMAScript是官方规范定义的
  + 开发人员为了在不同的环境使用不同的JavaScript模块化解决方法，所以ECMAScript在2015年发布了ECMAScript 2016官方标准，其中就包含了官方对JavaScript模块化的支持。也就是说语言天生就支持了。但是虽然标准已经发布了，但是JS运行环境还不支持
  + Node也是在8.5版本后才对ES6 Module进行了支持
  + ES6 可以使用编译器转为ES5
目前的前端情况是使用很多新的技术，然后利用编译器工具打包可以在低版本浏览器运行
使用新技术的目的就是为了提高效率，增加可维护性

## path路径操作模块

- path.basename
  + 获取一个路径的文件名（默认包含扩展名）
- path.dirname
  + 获取一个路径中的目录部分
- path.extname
  + 获取一个路径中的扩展名部分
- path.parse
  + 把一个路径转为对象
    * root根路径
    * dir目录
    * base包含后缀名的文件名
    * ext后缀名
    * name不包含后缀名的文件名
- path.join
  + 当需要路径拼接时，使用
- path.isAbsolute
  + 判定一个路径是否是绝对路径



## Node中的其他成员

在每个模块中，除了`require`、 `exports`等模块相关API之外，还有两个特殊的成员

- `__dirname`**动态获取**可以用来获取当前文件模块所属目录的绝对路径
- `__filename`**动态获取**可以用来获取当前文件的绝对路径

