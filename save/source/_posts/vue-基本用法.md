---
categories:
  - VUE
    - VUE 2
tags:
  - VUE
---
## 事件

### 事件绑定

#### 事件函数参数传递

1. 如果事件直接绑定函数名称，那么默认会传递事件对象作为事件函数的第一个参数
2. 如果事件绑定函数调用，那么事件对象必须作为最后一个参数显示传递，并且事件对象的名称必须是$event实参

#### 事件修饰符

- .stop阻止冒泡

  ```js
  v-on:click.stop="handle"
  ```

- .prevent阻止默认行为

  ```js
  v-on:click.prevent="handle"
  ```

#### 按键修饰符

- .enter回车键

  ```js
  <input v-on:keyup.enter="submit">
  ```

- .delete删除键

  ```js
  <input v-on:keyup.delete="clearContent">
  ```

#### 自定义按键修饰符

- 全局config.keyCodes对象

  规则：自定义按键修饰符名字是自定义的，但是对应的值必须是按键对应的event.keyCode值

  ```js
  //通过事件对象event.keyCode找到键值
  Vue.config.keyCodes.f1 = 112
  ```



## 属性绑定

v-model的底层实现原理分析

```js
<input v-bind:value="msg" v-on:input="msg=$event.target.value" >
```



## 样式绑定

### class样式处理

- 对象语法

  ```js
  <div v-bind:class="{ active:isActive }"></div>
  ```

- 数组语法

  ```js
  <div v-bind:class="[activeClass,errorClass]"></div>
  ```

样式绑定相关语法细节：

1. 对象绑定和数组绑定可以结合使用

   ```js
   <div v-bind:class="[activeClass,errorClass,{text:isText}]"></div>
   ```

2. class绑定的值可以简化操作

   ```js
   data: {
   	arrClasses: ['active','error'],
     objClasses: {
       active: true,
       error: true
     }
   }
   ```

3. 默认的class如何处理

   默认的class会保留，v-bind绑定的class会追加到默认的后面



### style样式处理

- 对象语法

  ```js
  <div v-bind:style="{border:borderStyle,width:widthStyle}"></div>
  <div v-bind:style="objStyles"></div>
  
  
  data:{
    borderStyle:'1px solid blue',
    widthStyle: '100px',
    objStyles:{
      borderStyle:'1px solid blue',
      widthStyle: '100px'
    }
  }
  ```

- 数组语法

  ```js
  <div v-bind:style="[baseStyles,overrideStyles]"></div>
  ```



## 表单操作

### 表单域修饰符

- number：转化为数值
- trim：去掉开始和结尾的空格
- lazy：将input事件切换为change事件



## 自定义指令

### 为何需要自定义指令

内置指令不满足需求

### 自定义指令的语法规则（获取元素焦点）

```js
Vue.directive('focus',{
	inserted: function(el){
    //el表示指令所绑定的元素
		el.focus()
	}
})
```

### 自定义指令的用法

```js
<input type="text" v-focus>
```

### 带参数的自定义指令及使用（改变元素背景色）

```javascript
Vue.directive('color', {
    inserted: function (el, binding) {
        el.style.backgroundColor = binding.value.color
    }
})

//使用
<input type="text" v-color='{color:"orange"}'>
```



## 局部指令

```js
//在vue的实例中添加directives属性
directives: {
	focus: {
		//指令的定义
		inserted:function(el){
			el.focus()
		}
	}
}
```



## 计算属性

计算属性与方法的区别

- 计算属性是基于他们的依赖进行缓存的
- 方法不存在缓存



## 侦听器

应用场景：数据变化时执行异步或开销较大的操作

用法：

```js
watch: {
	firstName: function(){}
}
```



## 过滤器

作用： 格式化数据，比如将字符串格式化为首字母大写，将日期格式化为指定的格式等

### 自定义过滤器

```js
Vue.filter('过滤器名称',function(value){
//过滤器业务逻辑
})
```



### 过滤器的使用

```js
<div>{{ msg | upper }}</div>
<div>{{ msg | upper | lower }}</div>
<div v-bind:id="id | formatId"></div>
```



### 局部过滤器

```js
filers:{
	upper:function(val){
		
	}
}
```



### 带参数的过滤器

```js
Vue.filter('format',function(val,arg){
	//val就是过滤器传递过来的参数
  if(arg === "yyyy-MM-dd"){
    var ret = '';
    ret += val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
    return ret
  }
  return value
})

//使用
<div>{{ date | format('yyyy-MM-dd') }}</div>
```



## 生命周期

1. 主要阶段

   - 挂载（初始化相关属性）

     + beforeCreate

       在实例初始化之后，数据观测和事件配置之前被调用

     + created

       在实例创建完成后被立即调用

     + beforeMount

       在挂载开始之前被调用

     + mounted

       被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子

   - 更新（元素或组件的变更操作）

     + beforeUpdate

       数据更新时调用，发生在虚拟DOM打补丁之前

     + updated

       由于数据更改导致的虚拟DOm重新渲染和打补丁，在这之后会调用该钩子

   - 销毁（销毁相关属性）

     + beforeDestroy

       实例销毁之前调用

     + destroyed

       实例销毁之后调用



## 组件化开发

### 组件化规范：Web Components

- 希望尽可能多的重用代码
- 自定义组件的方式不太容易
- 多次使用组件可能导致冲突

通过创建**封装好功能**的定制元素解决上述问题



### 组件注册

组件名称推荐用中横线的方式命名

#### 全局组件注册语法

```js
Vue.component(组件名称,{
	data:组件数据,
	template:组件模版内容
})
```

组件注册注意事项

1. data必须是一个函数
2. 组件模板内容必须是单个根元素
3. 组件模板内容可是是模板字符串（ES6语法，需要浏览器提供支持）



#### 局部组件注册

```js
var componentA = {}
new Vue({
	el: '#app',
	components: {
		'component-a':componentA
	}
})
```

### 组件间数据交互

#### 父组件向子组件传值

1. 组件内部通过props接收传递过来的值

2. 父组件通过属性将值传递给子组件

3. props属性名规则

   - 在props中使用驼峰形式，模版中需要使用短横线的形式
   - 字符串形式的模版中没有这个限制

   ```js
   Vue.component('menu-item',{
     //在js中使用驼峰式
   	props: ['menuTitle'],
   	template:'<div>{{ menuTitle }}</div>'
   })
   
   //在html中是短横线方式
   <menu-item menu-title="nihao"></menu-item>
   ```

#### 子组件向父组件传值

子组件通过自定义事件向父组件传递信息

```js
//子组件 触发事件
<button v-on:click="$emit('enlarge-text')">扩大字体</button>

//父组件
<menu-item @enlarge-text="fontSize += 0.1"></menu-item>


//传参
//子组件 触发事件
<button v-on:click="$emit('enlarge-text',5)">扩大字体</button>

//父组件
<menu-item @enlarge-text="handle($event)"></menu-item>
```

#### 非父子组件间传值

1. 单独的事件中心管理组件间的通信

   ```js
   var eventHub = new Vue()
   ```

2. 监听事件与销毁事件

   ```js
   eventHub.$on('add-todo',addTodo)
   eventHub.$off('add-todo')
   ```

3. 触发事件

   ```js
   eventHub.$emit('add-todo',id)
   ```



### 组件插槽

- 父组件向子组件传递内容

### 基本用法

1. 插槽位置

   ```js
   Vue.component('alert-box',{
   	template: `
   		<div>
   			<slot></slot>
   		</div>
   	`
   })
   ```

2. 插槽内容

   ```js
   <alert-box>Something happened.</alert-box>
   ```



### 具名插槽用法

1. 插槽定义

2. 插槽内容

   ```
   //定义
   <slot name="header"></slot>
   <slot></slot>
   <slot name="footer"></slot>
   
   
   //使用
   <div>
   	<template slot="header">
   		<p>头部</p>
   	</template>
   	<p>内容</p>
   	<p slot="footer">尾部</p>
   </div>
   ```



### 作用域插槽

- 应用场景：父组件对子组件的内容进行加工处理

1. 插槽定义

2. 插槽内容

   ```js
   //定义
   <ul>
   	<li v-for="item in list" v-bind:key="item.id">
   		<slot v-bind:item="item">  //绑定自定义属性，提供给父组件
   			{{ item.name }}
   		</slot>
   	</li>
   </ul>
   
   
   //内容
   <fruit-list>
   	<template slot-scope="slotProps">  //获取子组件绑定的自定义属性
   		<strong v-if="slotProps.item.current">
   			{{ slotProps.item.text }}
   		</strong>
   	</template>
   </fruit-list>
   ```



## Vue前端交互模式

### url地址格式

1. 传统形式的url

   格式：schema://host:port/path?query#fragment

   - schema:协议，例如http、https、ftp
   - host：域名或者IP地址
   - port：端口，http默认端口80，可以省略
   - path：路径
   - query：查询参数
   - fragment：锚点（哈希Hash），用于定位页面的某个位置

2. Restful形式的url

   - http请求方式
     + get查询
     + post添加
     + put修改
     + delete删除



## 接口调用-fetch用法

### 概述

1. 基本特性

   - 更加简单的数据获取方式，功能更强大、更灵活，可以看作是xhr的升级版
   - 基于Promise实现

2. 语法结构

   ```js
   fetch(url).then(fn2).then(fn3).catch(fn)
   ```

3. 基本用法

   ```
   fetch('/abc').then(data => {
   	return data.text()  //fetch提供的API，返回的是Promise实例对象
   }).then(ret => {
   	//注意：这里得到的才是最终的数据
   	console.log(ret)
   })
   ```

4. 请求参数

   常用配置选项

   - method(String):Http请求方式，默认为get

   - body(String):Http的请求参数

   - headers(Object):Http的请求头，默认为{}

     ```js
     fetch('/abc',{
     	method: 'get'
     }).then(data => {
     	return data.text()
     }).then(ret => {
     	//注意：这里得到的才是最终的数据
     	console.log(ret)
     })
     
     
     fetch('/abc',{
     	method: 'post',
       body: 'uname=lis&pwd=12',
       //或者写成
       body: JSON.stringify({
         uname: 'lis',
         pwd: 12
       }),
       headers: {
         'Content-Type':'application/x-www-form-urlencoded'
       }
     }).then(data => {
     	return data.text()
     }).then(ret => {
     	//注意：这里得到的才是最终的数据
     	console.log(ret)
     })
     ```

5. 响应结果

   响应数据格式

   - text()

     将返回体处理成字符串类型

   - json()

     返回结果和JSON.parse(responseText)一样



## 接口调用-axios用法

### 基本特性

是一个基于Promise用于浏览器和node.js的http客户端

它具有以下特性：

- 支持浏览器和node.js
- 支持promise
- 能拦截请求数据
- 自动转化json数据



### 基本用法

```js
axios.get('/data').then(ret=>{
	console.log(ret.data)//data是固定的，用于获取后台返回的数据
})
```



### 常用API

- get

  查询数据

  ```js
  //通过url传递参数
  axios.get('/data?id=1').then(ret=>{
  	console.log(ret.data)//data是固定的，用于获取后台返回的数据
  })
  //后台接收
  app.get('/data',(req,res)=>{
    res.send(req.query.id)
  })
  
  
  
  //restful格式的url
  axios.get('/data/1').then(ret=>{
  	console.log(ret.data)//data是固定的，用于获取后台返回的数据
  })
  //后台接收(restful格式的url)
  app.get('/data/:id',(req,res)=>{
    res.send(req.params.id)
  })
  
  
  //通过params选项传递参数
  axios.get('/data',{
    params:{
      id:1
    }
  }).then(ret=>{
  	console.log(ret.data)//data是固定的，用于获取后台返回的数据
  })
  //后台接收
  app.get('/data',(req,res)=>{
    res.send(req.query.id)
  })
  ```

  

- post

  添加

  ```js
  //通过选项传递参数
  axios.post('/data',{
    uname: 'lily',
    pwd: 123
  }).then(ret=>{
  	console.log(ret.data)
  })
  //后台接收
  app.post('/data',(req,res)=>{
    res.send(req.body)
  })
  
  
  //通过URLSearchParams传递参数（application/x-www-form-urlencoded）
  const params = new URLSearchParams()
  params.append('param1','value1')
  axios.post('/data',params).then(ret=>{
    console.log(ret.data)
  })
  ```

  

- put

  修改

  参数传递方式与post类似

- delete

  删除

  参数传递方式与get类似



### 响应结果

响应结果的主要属性：

- config

- data

  实际响应回来的数据

- headers

  响应头信息

- request

- status

  响应状态码

- statusText

  响应状态信息



### 全局配置

- axios.defaults.timeout = 3000 

  超时时间

- axios.defaults.baseURL = 'http://localhost:3000/'  

  配置请求的基准url地址

- axios.defaults.headers['mytoken'] = 'afdffdsfsd'

  设置请求头信息



### 拦截器

- 请求拦截器

  在请求发出之前设置一些信息

  ```js
  //添加一个请求拦截器
  axios.interceptors.request.use(function(config){
  	//在请求发出之前进行一些信息设置
  	return config
  },function(err){
  	//处理响应的错误信息
  })
  ```

- 响应拦截器

  在数据返回之前对数据加工处理

  ```js
  axios.interceptors.response.use(function(res){
  	return res
  },function(err){
  })
  ```





## 接口调用-async/await用法

### 基本用法

- ES7新语法，可以更方便的进行异步操作

- async关键字用于函数上（async函数的返回值是Promise实例对象）

- await关键字用于async函数当中（await可以得到异步的结果）

  ```js
  async function queryData(id){
  	const ret = await axios.get('/data')
    return ret
  }
  queryData.then(ret => {
    console.log(ret)
  })
  ```



### 处理多个异步请求

```js
async function queryData(){
  const info = await axios.get('/async1')
  const ret = await axios.get('/async2?info='+info.data)
  return ret
}
queryData.then(ret => {
  console.log(ret)
})
```



## 路由

- 后端路由

  概念：根据不同的用户url请求，返回不同的内容

  本质：url请求地址与服务器资源之间的对应关系

- 前端路由

  SPA实现原理：基于url地址的hash（hash的变化会导致浏览器记录访问历史的变化，但是hash的变化不会触发新的url请求）

  概念：根据不同的用户事件，显示不同的页面内容

  本质：用户事件与事件处理函数之间的对应关系

### Vue Router

官方的路由管理器

包含的功能有：

- 支持html5的历史模式或hash模式
- 支持嵌套路由
- 支持路由参数
- 支持编程式路由
- 支持命名路由
- etc...

#### 基本使用

1. 引入相关的库文件（先引用vue，再引用vue-router）

2. 添加路由链接

   ```js
   <router-link to="/user"></router-link>
   ```

3. 添加路由填充位

   ```js
   <router-view></router-view>
   ```

4. 定义路由组件

   ```js
   const User = {
   	template: '<h1>User</h1>'
   }
   ```

5. 配置路由规则并创建路由实例

   ```js
   //创建路由实例对象
   var router = new Router({
   	//路由规则数组
   	routes: [
   		//每个路由规则都是一个配置对象，其中至少包含path和component两个属性，path表示当前路由规则匹配的hash地址；component表示当前路由规则对应要展示的组件
   		{path:'/user',component:User}
   	]
   })
   ```

6. 把路由挂载到Vue根实例中

   ```js
   new Vue({
   	el: "#app",
     //为了能够让路由规则生效，必须把路由对象挂载到vue实例对象上
   	router
   })
   ```



#### 嵌套路由

1. 父路由组件模版

   - 父级路由链接
   - 父组件路由填充位

2. 子级路由模版

   - 子级路由链接
   - 子级路由填充位

3. 嵌套路由配置

   - 父级路由通过children属性配置子级路由

     ```js
     var router = new Router({
     	routes: [
     		{
           path:'/register',
           component:Register,
           //为/register添加子路由规则
           childeren:[
           	{
           		path: '/register/tab1',
           		component: Tab1
           	},
           	{
           		path: '/register/tab2',
           		component: Tab2
           	}
           ]
     		}
     	]
     })
     ```



#### 动态路由

##### 基本用法

```js
var router = new Router({
	routes: [
		{path:'/user/:id',component:User}
	]
})

const User = {
	//路由组件中通过$route.params获取路由参数
	template: '<div>User{{ $route.params.id }}</div>'
}
```

##### 路由组件传递参数

$route与对应路由形成高度耦合，不够灵活，所以可以使用props将组件和路由解耦

```js
//1.props的值为布尔类型
var router = new Router({
	routes: [
    //props设置为true，route.params将会被设置为组件属性
		{path:'/user/:id',component:User,props:true}
	]
})

const User = {
  props: ['id'],//使用props接收路由参数
	template: '<div>User{{ id }}</div>'
}


//2.props的值为对象
var router = new Router({
	routes: [
    //props设置为对象，他会被按原样设置为组件属性
		{path:'/user/:id',component:User,props:{uname:'lily',age:12}}
	]
})

const User = {
  props: ['uname','age'],//使用props接收路由参数
	template: '<div>User{{ uname + '---' + age }}</div>'
}


//3.props的值为函数
var router = new Router({
	routes: [
    //props设置为函数，则这个函数接收route对象为自己的形参
		{
      path:'/user/:id',
      component:User,
      props:route=>({uname:'lily',age:20,id:route.params.id})
    }
	]
})

const User = {
  props: ['uname','age','id'],
	template: '<div>User{{ uname + '---' + age + '---' + id }}</div>'
}
```



#### 命名路由

为了方便的表示路由的路径，可以给路由规则起一个别名，即为命名路由

```js
var router = new Router({
	routes: [
    {
      path:'/user/:id',
      component:User,
      name: 'user'
    }
	]
})

<router-link :to="{name:'user',params:{id:12}}">User</router-link>  //声明式导航
router.push({name:'user',params:{id:12}})
```



#### 编程式导航

常用的编程式导航API如下：

- this.$router.push('hash地址')

  参数规则

  1. 字符串（路径名称）

     router.push('/home')

  2. 对象

     router.push({path:'/home'})

  3. 命名的路由（传递参数）

     router.push({name: '/user',params:{userId:123}})

  4. 带查询的参数，变成/register?uname=lisi

     router.push({path:'/register',query:{uname:'lisi'}})

- this.$router.go(n)

