---
categories:
  - [Node.js, notes, 处理表单get提交]
tags:
  - Node.js
---
## 以前表单是如何提交的
表单中需要提交的表单控件元素必须具有name属性

- 表单提交分为：
  1. 默认的提交行为
  2. 表单异步提交
``` html
// action 就是表单提交的地址，即请求的url地址
// method请求方法 get post
<form action="/pinglun" method="get"></form>
```
``` javascript
// /post?a=1&b=2
/**
 * 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
 * 所以你不可能通过去判断完整的url路径来处理该请求
 * 结论：对于我们来讲，其实只需要判定，如果你的请求路径是/post的时候，那我就认为你提交表单的请求过来了
 */
var url = require('url')
// 使用 url.parse方法将路径解析为一个方便操作的对象 第二个参数是用 querystring 模块来解析URL中的查询字符串部分，默认为 false
/*详解
url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
输入 URL 字符串，返回一个对象。
将第二个参数设置为 true 则使用 querystring 模块来解析 URL 中的查询字符串部分，默认为 false。
将第三个参数设置为 true 来把诸如 //foo/bar 这样的URL解析为 { host: 'foo', pathname: '/bar' } 而不是 { pathname: '//foo/bar' }。 默认为 false。
*/
var parseObj = url.parse(req.url, true)
//获取当前url的路径部分
var pathname = parseObj.pathname
//获取表单提交的数据
var query = parseObj.query
```

## 如何通过服务器让客户端重定向？

1. 状态码设置为302（临时重定向）

   - response.statusCode = 302

     301 永久重定向 浏览器会记住

     - a.com  b.com
     - a浏览器不会请求a了，直接去跳到b了

     302 临时重定向 浏览器不记忆

     - a.com  b.com
     - a.com还会请求a，告诉浏览器要去b
2. 在响应头中通过Location告诉客户端往哪儿重定向
  
   - response.setHeader('Location','/')

==如果客户端发现收到服务器的响应的状态码是302就会自动去响应头中找Location，然后对该地址发起新的请求，所以你就能看到客户端自动跳转了==

