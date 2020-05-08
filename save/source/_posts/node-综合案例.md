---
categories:
  - Node.js
tags:
  - Node.js
  - Node.js应用
---
## 目录结构

```
├── app.js                      
├── controllers                 
├── models            					# 存储使用mongoose设计的数据模型
├── node_modules                # 第三方包
├── package.json                # 包描述文件
├── package-lock.json  					# eslint 第三方包版本锁定文件（npm5以后才有）
├── public                   		# 公共的静态资源
├── README.md                		# 项目说明文档
├── routes             					# 路由
└── views              					# 存储视图目录
```



## 模板页

- art-template子模板
- art-template模板继承



## 路由设计

| 路径      | 方法 | get参数 | post参数                  | 是否需要登陆 | 备注         |
| --------- | ---- | ------- | ------------------------- | ------------ | ------------ |
| /         | GET  |         |                           |              | 渲染首页     |
| /register | GET  |         |                           |              | 渲染注册页面 |
| /register | POST |         | email、nickname、password |              | 处理注册请求 |
| /login    | GET  |         |                           |              | 渲染登陆页面 |
| /login    | POST |         | email、password           |              | 处理登陆请求 |
| /logout   | GET  |         |                           |              | 处理退出请求 |





## 模型设计

``` javascript
//设计架构
var userSchema = new Schema({
  nickname: {
    type: String,
    required:true
  },
  password: {
  	type: String,
    required:true
	},
  created_time: {
    type: Date,
    //注意：这里不要写Date.now()，因为会即刻调用
    //这里直接给了一个方法Date.now
    //当你去new Model的时候，如果没有传递create_time，则mongoose会调用default指定的Date.now方法，使用其返回值作为默认值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  gender: {
    type: Number,
    enum: [-1,0,1],//枚举，从这三个值中选择
    default: -1
  },
  status: {
    type: Number,
    //0没有权限限制  1不可以评论  2不可以登陆
    enum: [0,1,2],
    default: 0
  }
})

//发布
module.exports = mongoose.model('User',userSchema)
```





## 功能实现

- Express提供了一个响应方法json，该方法接收一个对象作为参数，会自动帮你把对象转为字符串再发送给浏览器

- 表单具有默认的提交行为，默认是同步的

  - 同步表单提交，浏览器会锁死（转圈儿）等待服务器的响应结果。表单的同步提交之后，无论服务器响应的是什么，都会直接把响应的结果覆盖掉当前页面。

  + 后来有人想到了一种办法，来解决这个问题。 即服务端返回响应的是当前页面，把错误信息通过模版渲染到固定位置

- 服务端重定向只针对同步请求有效，异步请求无效。这时需要客户端location.href重新跳转

- 在Express框架中，默认不支持session和cookie，可以使用第三方中间件：express-session来解决。配置好后（中间件的配置都必须放到router路由前面），通过req.session来访问和设置session成员

  + 安装：

    npm install express-session

  + 配置：

    ```javascript
    app.use(session({
      //配置加密字符串，他会在原有加密基础之上和这个字符串拼起来去加密（目的：增加安全性，防止客户端恶意伪造）
    	secret: 'itcast',
    	resave:false,
      //未初始化保存：设置为true，指的是：无论是否使用session，都默认直接分配一把钥匙
    	saveUninitialized: true
    }))
    ```

  + 使用

    ```javascript
    //添加session数据
    req.session.foo = 'bar'
    
    //获取session数据
    req.session.foo
    
    //清除session
    req.session.foo = null
    ```

    提示：默认Session数据是内存存储的，服务器一旦重启就会丢失，真正的生产环境会把Session进行持久化存储



## 书写步骤

- 创建目录结构
- 整合静态页-模板页
  + include
  + block
  + extend
- 设计用户登陆、退出、注册的路由
- 用户注册
  + 先处理好客户端页面的内容（表单控件的name、收集表单数据、发送请求）
  + 服务端
    * 获取客户端表单请求数据
    * 操作数据库
      - 如果有错，发送500告诉客户端服务器错了
      - 其他的根据业务发送不同的响应数据
- 用户登陆
- 用户退出