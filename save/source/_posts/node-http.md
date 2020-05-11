---
categories:
  - [Node.js, notes, http]
tags:
  - Node.js
---
## 使用node轻松构建web服务器

1. 在Node中专门提供了一个核心模块，http
2. http模块的职责-创建编写服务器

```javascript
//1.加载http核心模块
var http = require('http')
//2.使用http.createServer()方法创建一个web服务器
var server = http.createServer()//返回一个Server实例
//服务器要干嘛？提供服务，对数据的服务 发请求-接收请求-处理请求-给个反馈（发送响应）
//3.注册request请求事件，当客户端请求过来，就会自动触发服务器的request事件，然后执行第二个参数，回调处理
server.on('request',function(){
  console.log('收到客户端的请求了')
})
//4.绑定端口号，启动服务器
server.listen(3000,function(){
  console.log('服务器启动成功了，可以进行访问了')
})
```

![服务运行成功](https://gitee.com/xiaoxin1993/imgs/raw/master/blog/posts/content/http.png)

```javascript
//request请求事件处理函数，需要接收两个参数
//Request请求对象：用来获取客户端的请求信息，例如请求路径
//Response响应对象：用来给客户端发送响应消息
server.on('request',function(request,response){
  console.log('收到客户端请求',request.url)
  //response对象有一个write方法：用来给客户端发送响应数据
  //write可以使用多次，但是最后一定要使用end结束响应，否则客户端会一直等待
  response.write('hello')
  response.write('nodejs')
  response.end()
  //由于现在我们的服务器的能力还非常的弱，无论是什么请求，都只能响应hellonodejs 思考：我希望当请求不同的路径时，响应不同的结果
  //例如
  // /index
  // /login登陆
  // /register注册
  //简单的方式：end的同时发送响应数据
  response.end('hello world')
  //根据不同的请求路径发送不同的响应结果
  //1.获取请求路径
  // request.url获取到的是端口号之后的那一部分路径
  // 也就是说所有的url都是以/开头
  //2.判断路径，处理响应
  var url = request.url
  if(url === '/') {
    response.end('index page')
  }else if(url ==='/login') {
    response.end('login page')
  }else{
    response.end('404 page')
  }
  //响应的数据只能是字符串或者二进制数据
  var products = [
    {
      name: 'apple',
      price: 30
    }, {
      name: 'orange',
      price: 40
    }
  ]
  response.end(JSON.stringify(products))
})
```

## 发送文件中的数据以及Content-Type内容类型

```javascript
var http = require('http')
var server = http.createServer()
server.on('request', function (req, res) {
  /*
  在服务端默认发送的数据，其实是utf8编码的内容
  但是浏览器不知道你是utf8的内容
  浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码区解析
  中文操作系统默认是gbk
  解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
  在http协议中，Content-Type就是用来告诉对方，我给你发送的数据内容是什么类型的
  */
  // charset编码格式
  //text/plain普通的文本
  	res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.end('hello，世界')
  //text/html html格式的文本
  	res.setHeader('Content-Type','text/html;charset=utf-8')
})
server.listen(3000, function () {
    console.log('start')
})
```

```javascript
/*
1.结合fs发送文件中的数据
2.Content-Type：https://tool.oschina.net/commons
不同资源对应的Content-Type是不一样的，图片不需要指定编码；一般只为字符数据指定编码
*/
var http = require('http')
var fs = require('fs')
var server = http.createServer()
server.on('request', function (req, res) {
  var url = req.url
  if(url === '/tupian'){
    //url统一资源定位符：一个url最终其实是对应到一个资源的
    fs.readFile('./1.jpg', function (err, data) {
        if (err) {
            res.setHeader('Content-Type', 'text/plain;charset=utf-8')
            res.end('文件读取失败')
        } else {
          //data默认是二进制数据，可以通过.toString转为我们能识别的字符串
          //res.end（）支持两种数据类型，一种是二进制；一种是字符串
          //图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
            res.setHeader('Content-Type', 'image/jpeg')
            res.end(data)
        }
    })
   }
})
server.listen(3000, function () {
    console.log('start')
})
```

常用对照表：https://tool.oschina.net/commons

## 请求对象Request

- request.url

## 响应对象Response

``` javascript
if(err){
//return 作用 1、返回值 2、阻止代码往后执行
	return res.end('404')
}
```
服务端返回页面数据给浏览器时，html数据，既可以通过setHeader设置Content-Type，也可以直接在html页面中head标签内通过meta元数据来声明当前文本的编码格式

