---
categories:
  - [Node.js, notes, fs]
tags:
  - Node.js
---
# 读取文件

第一个参数是要读取的文件路径；第二个参数是回调函数，其中参数error、data

成功：data数据  error null

失败：data undefined没有数据   error 错误对象

```javascript
var fs = require('fs')
fs.readFile('./README.md',function(error, data){
  //<Buffer 79 6f 75 20 72 65 61 64 20 6d 65>
  //文件中存储的其实都是二进制数据 0 1
  //这里为什么看到的不是0和1呢 ？是因为二进制转为十六进制了
  //但是无论是二进制还是十六进制，人类都不认识
  //所以可以通过toString方法把其转为我们能认识的字符
  //在这里就可以通过判断error来确认是否有错误
  if(error){
    console.log('读取文件失败了')
  }else{
    console.log(data.toString())
  }
})
```

# 写文件

`var fs = require('fs')`

//第一个参数，文件路径

//第二个参数，文件内容

//第三个参数，回调函数（error错误对象）

//成功： 文件写入成功，error是null

//失败：文件写入失败，error是错误对象

```javascript
fs.writeFile('./write.txt','大家好',function(error){

	console.log('文件写入成功')

})
```



# 文件操作的__dirname和__filename

- `__dirname`**动态获取**可以用来获取当前文件模块所属目录的绝对路径
- `__filename`**动态获取**可以用来获取当前文件的绝对路径
- `__dirname`和`__filename`是不受执行node命令所属路径影响的

``` javascript
var fs = require('fs')
/*
	./a/txt并不是相对于当前文件路径
				 其实是相对于执行node命令所处的终端路径
	Node就是这样设计的：在文件操作路径中，相对路径设计的就是相对于执行node命令所处的路径
*/
fs.readFile('./a.txt','utf8',function(err,data){
  if(err){
    throw err
  }
  console.log(data)
})
```

在文件操作中，使用相对路径是不可靠的，因为在Node中，文件操作路径，相对路径设计的就是相对于执行node命令所处的路径

只需要把相对路径变为绝对路径就可以了。

使用`__dirname`或者` __filename`即可解决

在拼接路径的过程中，为了避免手动拼接带来的一些低级错误，所以推荐多使用：`path.join()`来辅助拼接

所以为了避免刚才所描述的这个问题，以后在文件操作的路径都使用**动态的绝对路径处理**

注：模块中的路径标识和这里的路径没关系，不受影响（相对于文件模块）