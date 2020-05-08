---
categories:
  - Node.js
    - notes
tags:
  - Node.js
  - MongoDB-node
---
## 关系型数据库和非关系型数据库

关系型数据库：

表就是关系

或者说表跟表之间存在关系

- 所有的关系型数据库都需要通过`sql`语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  + 唯一的
  + 主键
  + 默认值
  + 非空



非关系型数据库：

- 非常的灵活
- 有的非关系型数据库就是key-value对儿
- 但是MongoDB是长得最像关系型数据库的非关系型数据库
  + 数据库-》（MongoDB中）数据库
  + 数据表-》（MongoDB中）集合（数组）
  + 表记录-》（MongoDB中）（文档对象）
- MongoDB不需要设计表结构
- 也就是说你可以任意的往里面存数据，没有结构性这么一说



## 介绍和安装

> https://www.runoob.com/mongodb/nosql.html

### 介绍

MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。

在高负载的情况下，添加更多的节点，可以保证服务器性能。

MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

#### MongoDB数据库的基本概念

- 数据库（可以有多个）
- 集合（一个数据库中可以有多个集合）
- 文档（一个集合当中可以有多个文档）
- 文档结构很灵活，没有任何限制
- MongoDB非常灵活，不需要像mySQL一样先创建数据库、表、设计表结构
  + 在这里，当你需要插入数据的时候，只需要指定往哪个数据库的哪个集合操作就可以了
  + 一切都由MongoDB来帮你自动完成建库建表这件事儿

``` javascript
{
  qq: {//数据库
    users: [//集合
      {},//文档
      {},
      {}
    ],
    products: [
      
    ]
  },
  taobao: {//数据库
    users: [//集合
      {},//文档
      {},
      {}
    ]
  }
}
```

### 安装

- 下载安装包，将解压包放到/usr/local

- 配置环境变量bash_profile和zshrc

  + ``` shell
    export PATH=/usr/local/mongodb/bin:$PATH
    ```

  + /用户/yongxinyuan/.zshrc，也加入上面路径

  + 终端输入`mongod --version`



## 启动和关闭数据库

- 启动

  ```shell
  #mac需要关闭SIP
  1.重启Mac，按住cmd+R进入Recovery模式
  2.打开终端，输入`csrutil disable`关闭SIP
  3.重启Mac，输入`csrutil status`查询SIP状态
  
  #如需开启SIP
  同上，输入`csrutil enable`
  
  # mongodb默认使用执行mongod命令所属盘符根目录下的/data/db作为自己的数据存储目录
  #（苹果电脑无法在根目录创建文件夹），所以需要修改默认的数据存储目录，如下：
  sudo mongod --dbpath=/Users/yongxinyuan/data/db
  ```

- 关闭

  在开启服务的控制台，直接ctrl+c即可停止；或者直接关闭开启服务的控制台



## 连接和退出数据库

- 连接

  `mongo`：该命令默认连接本机的MongoDB服务

- 退出

  `exit`：在连接状态输入该命令退出连接



## 基本命令

- `show dbs`
  + 查看显示所有数据库
- `db`
  + 查看当前操作的数据库
- `use 数据库名称`
  + 切换到指定的数据库（如果没有会在插入数据后新建）
- 插入数据
  + db.students.insertOne()
- 查询表集合
  + show collections
- 查询集合中的所有数据
  + db.students.find()



## 在Node中如何操作MongoDB数据

### 使用官方的mongodb包来操作

> [官方网址](https://github.com/mongodb/node-mongodb-native)

确实很强大，但是比较原始、麻烦



### 使用第三方mongoose来操作MongoDB数据库

第三方包:mongoose基于MongoDB官方的mongodb包再一次做了封装

真正在公司进行开发，使用的是这个第三方包

可以提高开发效率，操作MongoDB数据库更方便

- [官网](http://mongoosejs.com/)
- [官方指南](http://mongoosejs.com/docs/guide.html)
- [官方API文档](http://mongoosejs.com/docs/api.html)

#### 起步

- 安装

  `npm i mongoose`

- hello world

```javascript
var mongoose = require('mongoose');

//连接MongoDB数据库
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

//创建一个模型，就是在设计数据表
//MongoDB是动态的，非常灵活，只需要在代码中设计你的数据表就可以了
//mongoose包就可以让你的设计编写过程变得非常的简单
var Cat = mongoose.model('Cat', {//最终会生成小写的复数名称cats
    name: String
})

//实例化一个Cat
var kitty = new Cat({
    name: 'Lucy'
})

//持久化保存kitty实例
kitty.save(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('meow')
    }
})
```



#### 官方指南

##### 设计Scheme发布Model

```JavaScript
var mongoose = require('mongoose')

var Schema = mongoose.Schema

//1.连接数据库
//指定连接的数据库不需要存在，当你插入第一条数据之后会自动被创建出来
mongoose.connect('mongodb://localhost/test')

//2.设计文档结构（表结构）
/**
 * 字段名称就是表结构中的属性名称
 * 值
 * 约束的目的是为了保证数据的完整性，不要有脏数据
 */
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

//3.将文档结构发布为模型
/**
 * mongoose.model方法就是用来将一个架构发布为model
 * 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
 *           mongoose会自动将大写名词的字符串生成小写复数的集合名称
 *           例如这里的User最终会变味users集合名称
 * 第二个参数：架构Schema
 * 
 * 返回值：模型构造函数
 */
var User = mongoose.model('User',userSchema)

//4.当我们有了模型构造函数之后，就可以使用这个构造函数对users集合中的数据为所欲为了

```



##### 新增数据

```javascript
var admin = new User({
    username: 'admin',
    password:'123456',
    email: 'admin@admin.com'
})
admin.save(function(err,ret){
    if(err){
        console.log('保存失败')
    }else{
        console.log('保存成功')
    }
})
```



##### 查询数据

```javascript
//查询所有
User.find(function(err,ret){
    if(err){
        console.log('查询失败')
    }else{
        console.log(ret)
    }
})

//按条件查询所有,返回值是[],查不到返回空数组
User.find({
    username: 'zhangsan'
},function(err,ret){
    if(err){
        console.log('查询失败')
    }else{
        console.log(ret)
    }
})

//按条件查询单个，返回值是{},查不到返回null
User.findOne({
    username: 'zhangsan'
},function(err,ret){
    if(err){
        console.log('查询失败')
    }else{
        console.log(ret)
    }
})
```



##### 删除数据

```javascript
//根据条件删除所有
User.remove({
    username: 'admin'
},function(err,ret){
    if(err){
        console.log('删除失败')
    }else{
        console.log('删除成功')
    }
})

//根据条件删除一个
Model.findOneAndRemove(conditions,[options],[callback])

//根据id删除一个
Model.findByIdAndRemove(id,[options],[callback])
```



##### 更新数据

```javascript
//根据id更新一个
User.findByIdAndUpdate('5e95b2ecf184370af1855eeb',{
    password: '456'
},function(err,ret){
    if(err){
        console.log('更新失败')
    }else{
        console.log('更新成功')
    }
})

//根据条件更新所有
Model.update(conditions,doc,[options],[callback])

//根据指定条件更新一个
Model.findOneAndUpdate(conditions,[update],[options],[callback])
```

