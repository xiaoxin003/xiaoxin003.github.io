---
categories:
  - [Node.js, notes, node-Apache应用]
tags:
  - Node.js
---
- 如何得到wwwDir目录列表中的文件名和目录名
  - fs.readdir
- 如何将得到的文件名和目录名替换到template.html中
  - 在template.html中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
  - 根据files生成需要的html内容

```javascript
var http = require('http')
var fs = require('fs')
var server = http.createServer()
server.on('request',function(req,res){
    fs.readFile('./template.html',function (err,data){
        if(err){
            return res.end('404')
        }
       fs.readdir('/Users/yongxinyuan/Desktop/class/nodejs',function(err,files){
            if(err){
                return res.end('Can not find www dir')
            }
            // 生成需要替换的内容
            var content = ''
            files.forEach(function(item){
                // 在ecmascript6中的`字符串中，可以使用${}来引用变量
                content += `${item}`
            })
            // 替换
            data = data.toString()
         		// 在template.html中，预留特殊标记^_^
            data = data.replace('^_^',content)
            // 发送解析替换过后的响应数据
            res.end(data)
        }) 
    })
})
server.listen(3000,function(){
    console.log('start')
})
```

