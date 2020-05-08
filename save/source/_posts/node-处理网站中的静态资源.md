---
categories:
  - Node.js
    - notes
tags:
  - Node.js
---
1. 把当前模块所有的依赖项都声明在文件模块最上面
2. 当浏览器收到HTML响应内容之后，就要开始从上到下一次解析，当在解析的过程中，如果发现：
   - link
   - script
   - img
   - iframe
   - video
   - audio 
   等带有src或者href(link)属性标签的时候，浏览器会自动对这些资源发送新的请求
   
3. 为了让目录结构保持统一清晰，所以我们约定，把所有的html文件都放到views视图中
4. 我们为了方便统一处理这些静态资源，所以我们约定把所有的静态资源都存放在public目录中
5. 哪些资源能被用户访问，哪些资源不能被用户访问，可以通过代码来进行非常灵活的配置
6. 注意：在服务端，文件中的路径就不要去写相对路径了，因为这个时候所有的资源都是通过url标识来获取的，我的服务器开放了/public/目录，所以这里的请求路径都写成/public/XXX( / 在这里就是url根路径的意思。浏览器在真正发送请求的时候会最后把http://127.0.0.1:3000拼上)==不要再想文件路径了，把所有的路径都想象成url地址==

```html
<link rel="stylesheet" href="/public/css/main.css" />
```



```javascript
var http = require('http')
var fs = require('fs')
http
    .createServer(function (req, res) {// 简写方式：该函数会直接被注册成server的request请求事件处理函数
        var url = req.url
        if (url === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return res.end('404')
                }
                res.end(data)
            })
        } else if (url.indexOf('/public/') === 0) {
            // /public/css/main.css
            // /public/js/main.js
            //统一处理： 如果请求路径是以/public/开头的，则认为你要获取public中的某个资源
            // 直接可以把请求路径当作文件路径来直接进行读取
            fs.readFile('.' + url, function (err, data) {
                if (err) {
                    return res.end('404')
                }
                res.end(data)
            })
        }else{
            // 其他的都处理成404找不到
      			fs.readFile('./views/404.html',function(err,data){
                if(err){
                    return res.end('404')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('running...')
    })
```





