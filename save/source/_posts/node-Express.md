---
categories:
  - Node.js
    - notes
tags:
  - Node.js
---
## 概述

原生的http在某些方面表现不足以应对我们的开发需求，所以需要使用框架来加快开发效率。框架的目的是为了提高效率，让我们的代码高度统一

在Node中，有很多web开发框架，以学习`Express`为主

- http://expressjs.com/

## 起步

### 安装

`npm i -S express`

### 引用
`require('express')`

### hello world
```javascript
const express = require('express')
const app = express()
app.get('/',(req,res)=>res.send('hello world'))
app.listen(3000,()=>console.log('running'))
```
### 基本路由
路由器
- 请求方法
- 请求路径
- 请求处理函数
get:
``` javascript
//当以GET方法请求/的时候，执行对应的处理函数
app.get('/',(req,res)=>res.send('hello world'))
```
post:
``` javascript
//当以POST方法请求/的时候，执行对应的处理函数
app.post('/',(req,res)=>res.send('Got a POST request'))
```
### 静态服务
``` javascript
//当以/public/开头，去./public/目录下访问
//推荐此方法
app.use('/public/',express.static('./public/'))

//当省略第一个参数时，则要通过省略/public的方式来访问public里的具体资源
app.use(express.static('./public/'))

//必须是/a/public目录下的资源
app.use('/a/',express.static('./public/'))


app.use('/static',express.static(path.join(__dirname,'public')))
```

```javascript
var express = require('express')
//创建服务器应用程序 相当于http.createServer()
var app = express()
//公开指定目录:只要这样做了，就可以直接通过/public/xx的方式访问public目录中的所有资源了
app.use('/public/', express.static('./public/'))
//当服务器收到get请求/的时候，执行回调处理函数
app.get('/', function (req, res) {
  	//获取查询字符串参数
  	console.log(req.query)
  	//使用模板引擎res.render('文件名',{模板对象}) 需要配置，具体看art-template官方文档
    res.send('hello express')
})
//相当于server.listen
app.listen(3000, function () {
    console.log('running...')
})
```

## 修改完代码自动重启

第三方工具`nodemon`，基于Node.js开发的第三方命令工具

安装：`npm install --global nodemon`

使用：`nodemon app.js`

## 在Express中配置使用`art-template`模板引擎
- https://aui.github.io/art-template/zh-cn/index.html

- 安装
  ``` shell
  npm install --save art-template
  npm install --save express-art-template
  ```
  
- 配置
  
  `app.engine('art',require('express-art-template'))`
  
- 使用

  + Express为Response响应对象提供了一个方法：render，在配置了模板引擎之后就可以使用了
    `res.render('html模板名',{模板数据})`
  
  ```javascript
  app.get('/', (req, res) => {
      res.render('a.html',{
          title: '测试'
      })
  })
  ```
  
  + 如果想要修改默认的views目录，则可以这么做 
  
    `app.set('views',render函数的默认路径)`
  
  ```javascript
  var express = require('express')
  var app = express()
  
  app.use('/public/', express.static('./public/'))
  // 配置使用art-template模板引擎
  /* 第一个参数表示，当渲染以.art结尾的文件的时候，使用art-template模板引擎(可以更改后缀名)
     express-art-template是专门用来在Express中把art-template整合到Express中
     虽然这里不需要加载art-template，但是也必须安装，因为express-art-template依赖art-template
  */
  app.engine('html',require('express-art-template'))
  // Express为Response响应对象提供了一个方法：render，在配置了模板引擎之后就可以使用了
  // res.render('html模板名',{模板数据})
  // 第一个参数不能写路径，默认会去项目中的views目录查找该模板文件（也就是说，Express有一个约定：开发人员把所有的视图文件都放到views目录中）
  // 如果想要修改默认的views目录，则可以这么做 app.set('views',render函数的默认路径)
  app.get('/', (req, res) => {
      res.render('a.html',{
          title: '测试'
      })
  })
  app.listen(3000, () => console.log('running'))
  ```
  
## 重写留言本案例
重定向
`res.redirect('/')`

### 在Express中获取表单GET请求参数

Express内置了一个API，可以通过`req.query`来获取

### 在Express获取表单POST请求体数据

在Express中没有内置获取表单POST请求体的API，需要第三方包`body-parser`

- 安装

  `npm install --save body-parser`

- 配置

  `app.use(bodyParser.urlencoded({extended:false}))`
  `app.use(bodyParser.json())`
  
  ```javascript
  var express = require('express')
  
  //1.引包
  var bodyParser = require('body-parser')
  
  var app = express()
  
  //2.配置body-parser
  //只要加入这个配置，则在req请求对象上会多出来一个属性body
  //也就是说可以直接通过req.body来获取表单POST请求体数据了
  //parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())
  
  //3.使用
  app.use(function(req,res){
    res.setHeader('Content-Type','text/plain')
    res.write('you posted')
    //通过req.body来获取表单POST请求体数据
    res.end(JSON.stringify(req.body,null,2))
  })
  ```
  
- 使用

  通过`req.body`来获取表单POST请求体数据
### 在Express中配置session

express-session

在Express框架中，默认不支持session和cookie，可以使用第三方中间件：express-session来解决。配置好后（中间件的配置都必须放到router路由前面），通过req.session来访问和设置session成员



## CRUD
### 模块化思想

模块如何划分

- 模块职责要单一

### 起步

- 初始化
- 安装依赖
- 模板处理
### 读取文件
``` javascript
//readFile的第二个参数是可选的，传入utf8就是告诉它把读取的文件按照utf8编码读取
//也可以通过data.toString()转换
fs.readFile('./student.json','utf8',function(err,data){
  if(err){
    return res.status(500).send('Server error')
  }
  //文件中读到的数据一定是字符串,所以这里要转成对象
  var student = JSON.parse(data).student
})
```
### 路由设计

| 请求方法 | 请求路径         | get参数 | post参数              | 备注             |
| -------- | ---------------- | ------- | --------------------- | ---------------- |
| GET      | /students        |         |                       | 渲染首页         |
| GET      | /students/new    |         |                       | 渲染添加学生页面 |
| POST     | /students        |         | name、age、gender     | 处理添加学生请求 |
| GET      | /students/edit   | id      |                       | 渲染编辑页面     |
| POST     | /students/edit   |         | id、name、age、gender | 处理编辑请求     |
| GET      | /students/delete | id      |                       | 处理删除请求     |

### 路由模块的提取
（模块职责要单一。目的：增强项目代码的可维护性，提升开发效率）

```javascript
//router.js路由模块
/*职责：
	1.处理路由
	2.根据不同的请求方法，请求路径设置具体的请求处理函数
*/
var express = require('express')
//1.创建一个路由容器
var router = express.Router()
//2.把路由挂载到路由容器中
router.get('/student',function(req,res){})
router.get('/students/new',function(req,res){})
//3.导入router
module.exports = router
```

```javascript
//app.js：
/*职责：
	1.启动服务
	2.做一些服务相关配置
		模板引擎
		body-parser解析表单post请求体
		提供静态资源服务
	3.挂载路由
	4.监听端口启动服务
*/
var router = require('./router')
var app = express()
//把路由容器挂载到app服务中
app.use(router)
```

- 配置模板引擎和body-parser一定要在app.use(router)挂载路由之前
  
### 设计操作数据的API文件模块

  ```javascript
  //如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
  //即-->回调函数：获取异步操作结果
  function fn(callback) {
      //var callback = function(data){console.log(data)}
      setTimeout(function () {
          var data = 'hello'
          callback(data)
      }, 1000)
  }
  fn(function (data) {
      console.log(data)
  })
  ```

### 自己编写的步骤：

1. 处理模板

2. 配置开放静态资源

3. 配置模板引擎

4. 简单路由：/students 渲染静态页出来

5. 路由设计

6. 提取路由模块

7. 由于接下来的一系列的业务操作都需要处理文件数据，所以我们需要封装students.js

8. 先写好students.js文件结构
	- 查询所有学生列表的API find
  - findById
  - save
  - updateById
  - deleteById
  
9. 实现具体功能
	- 通过路由收到请求
  - 接收请求中的数据（get、post）
    + req.query
    + req.body
  - 调用数据操作API处理数据
  - 根据操作结果给客户端发送响应
  
10. 业务功能顺序
	- 列表
	- 添加
	- 编辑
	- 删除
  

```javascript
/**students.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */
var fs = require('fs')
var dbPath = './db.json'

/**
 * 获取所有学生列表
 * callback中的参数
 *  第一个参数是err
 *  第二个参数是data
 * return []
 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 根据id获取学生信息对象
 * @param {Number}   id       学生id
 * @param {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = student.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

/**
 * 添加保存学生
 * @param {Object}   student  学生对象
 * @param {Function} callback 回调函数
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        //处理id唯一的，不重复
        student.id = students[students.length - 1].id + 1
        students.push(student)
        var fileData = JSON.stringify({
            students: students
        })
        //把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err, data) {
            if (err) {
                //错误就是把错误对象传递给它
                return callback(err)
            }
            //成功就没错，所以错误对象是null
            callback(null)
        })
    })
}

/**
 * 更新学生
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        //注意：这里记得把id统一转换为数字类型
        student.id = parseInt(student.id)
        //要修改谁就需要把谁找出来
        //ECMAScript6中的数组方法：find，接收一个函数作为参数
        //当某个遍历项符合item.id === student.id条件的时候，find会终止遍历，同时返回遍历对象
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        //遍历拷贝对象
        for (var key in student) {
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students: students
        })
        //把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err, data) {
            if (err) {
                //错误就是把错误对象传递给它
                return callback(err)
            }
            //成功就没错，所以错误对象是null
            callback(null)
        })
    })
}
//先想怎么调用的
// updateById({
//     id:1,
//     name:'lucy'
// },function(err){})

/**
 * 删除学生
 * @param id       学生id
 * @param callback 回调函数
 */
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        //findIndex方法专门用来根据条件查找元素的下标
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        //根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)
        var fileData = {
            students: students
        }
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
```



## 中间件概念

> http://expressjs.com/en/guide/using-middleware.html

中间件：处理请求的，本质就是个函数

作用：把用户从请求到响应的整个过程分发到多个中间件中去处理，这样做能提高代码的灵活性，动态可扩展。

**规则：**

当请求进来，则会从第一个中间件开始进行匹配

- 如果匹配，则进来
  - 如果请求进入中间件之后，没有调用next方法，则停留在当前中间件
  - 如果调用了next方法，则继续向后找到第一个匹配的中间件
- 如果不匹配，则继续判断匹配下一个中间件



同一个请求所经过的中间件都是同一个请求对象和响应对象



在Express中，对中间件有几种分类

- 不关心请求路径和请求方法的中间件，也就是说任何请求都会进入这个中间件（万能匹配）

  中间件本身是一个方法，该方法接收三个参数

  + Request请求对象
  + Response响应对象
  + next下一个中间件

  当一个请求进入一个中间件之后，如果不调用next则会停留在当前中间件。所以next是一个方法，用来调用下一个中间件

  调用next方法也是要匹配的（不是调用紧挨着的那一个）

  `app.use(function(req,res){})`

  ```javascript
  app.use(function(req,res,next){
  	console.log(1)
  	next()
  })
  app.use(function(req,res,next){
  	console.log(2)
  })
  //1 2
  ```

- 关心请求路径的中间件

  以/xxx开头的路径中间件

  ```javascript
  app.use('/a',function(req,res){
  	console.log(req.url)
  })
  ```

- 严格匹配请求方法和请求路径的中间件

  + app.get

    ```javascript
    app.get('/',function (req,res,next{
    
    })
    ```

    

  + app.post

  + app.put

  + app.delete



```javascript
//写在最后
//配置一个处理404的中间件
app.use(function (req, res) {
    res.send('404')
})


app.get('/', function (req, res, next) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            next(err)//传递给四个参数的中间件
        }
    })
})

//配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})
```






