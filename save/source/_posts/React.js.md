---
categories:
 - [React, README]
tags:
 - React
---
## 简介
- 起源于Facebook的内部项目，因为该公司对市场上所有JavaScript MVC框架都不满意，就决定自己写一套，用来架设instagram（照片交友）的网站，做出来以后，发现这套东西很好用，就在2013年5月开源了
- Angular2009年 谷歌 MVC不支持组件化开发
- 由于React的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单，所以越来越多的人开始关注和使用，认为它可能是将来web开发的主流工具。
- 清楚两个概念
  + library（库）：小而巧；可以很方便的从一个库切换到另外的库，但是代码几乎不会改变
  + Framework（框架）：大而全；提供了一整套的解决方案，所以如果在项目的中间，想切换到另外的框架，是比较困难的

## 前端三大主流框架
- Angular.js
  出来较早的前端框架，学习曲线比较陡，NG1学起来比较麻烦，NG2-NG5开始，进行了一系列的改革，也提供了组件化开发的概念；从NG2开始，也支持使用TS（TypeScript）进行编程
- Vue.js
  最火的一门前端框架，他是中国人开发的，对我们来说，文档要友好一些
- React.js
  最流行的一门框架，因为它的设计很优秀
  
## React与Vue的对比
- 组件化方面
  + 模块化：是从代码的角度来进行分析的。把一些可复用的代码抽离成单个的模块，便于项目的维护和开发
  + 组件化：是从UI界面的角度来进行分析的。把一些可复用的UI元素抽离为单独的组件
  + 组件化的好处：随着项目规模的增大，手里的组件越来越多，很方便就能把现有的组件拼接成一个完整的页面
  + Vue是如何实现组件化的：通过.vue文件来创建对应的组件
    * template-结构
    * script-行为
    * style-样式
  + React是如何实现组件化的
    * React中有组件化的概念，但是并没有像vue这样的组件模板文件
    * React中，一切都是以JS来表现的
- 开发团队方面
  + React是由Facebook前端官方团队进行维护和更新的；因此，React的维护开发团队技术实力比较雄厚
  + Vue，第一版主要是由作者尤雨溪专门进行维护的，当Vue更新到2.x版本后，也有了一个以尤雨溪为主导的开源小团队，进行相关的开发和维护
- 社区方面
  + React由于诞生的较早，所以社区比较强大，一些常见的问题、坑、最优解决方案、文档、博客在社区中都是可以很方便就能找到
  + Vue是近两年才火起来的，所以，其社区相对比于React要小一些，可能有的坑没人踩过
- 移动App开发体验方面
  + Vue，结合Weex这门技术，提供了迁移到移动端App开发的体验（Weex目前只是一个小的玩具，并没有很成功的大案例）
  + React，结合ReactNative，也提供了无缝迁移到移动App的开发体验（RN用的最多，也是最火最流行的）

## 为什么要学习React
- 和Angular1相比，React设计很优秀，一切基于JS并且实现了组件化开发的思想
- 开发团队实力强悍，不必担心断更的情况
- 社区强大，很多问题都能找到对应的解决方案
- 提供了无缝转到ReactNative上的开发体验，让我们技术能力得到了扩展，增强了核心竞争力
- 很多企业中，前端项目的技术选型采用的是React.js

## React中几个核心的概念
- 虚拟DOM(Virtual Document Object Model)
  + DOM的本质是什么
    浏览器中的概念，用js对象来表示页面上的元素，并提供了操作DOM对象的API
  + 什么是虚拟DOM
    框架中的概念，是程序员用js对象来模拟页面上的DOM和DOM嵌套
  + 为什么要实现虚拟DOM
    为了实现页面中的DOM元素的高效更新
  + DOM和虚拟DOM的区别
    * DOM：浏览器中提供的概念，用js对象表示页面上的元素，并提供了操作元素的API
    * 虚拟DOM：框架中的概念。是开发框架的程序员手动用js对象来模拟DOM元素和嵌套关系
    本质：用js对象来模拟DOM元素和嵌套关系
    目的：为了实现页面元素的高效更新
- Diff算法
  + tree diff
    新旧两棵DOM树，逐层对比的过程就是Tree Diff；当整棵DOM逐层对比完毕，则所有需要被按需更新的元素，必然能够找到
  + component diff
    在进行Tree Diff的时候，每一层中，组件级别的对比叫做component Diff
    * 如果对比前后，组件的类型相同，则暂时认为此组件不需要被更新
    * 如果对比前后，组件类型不同，则需要移除旧组件，创建新组件，并追加到页面上
  + element diff
    在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做element diff

## 创建基本的webpack4.x项目
1.运行`npm init -y`快速初始化项目
2.在项目根目录创建src源代码目录和dist产品目录
3.在src中创建index.html和main.js
4.需要全局安装webpack、webpack-cli。运行`npm i webpack webpack-cli -g`
5.项目中使用npm安装webpack，运行`npm i webpack webpack-cli -D`
6.注意：webpack4.x提供了约定大于配置的概念：目的是为了尽量减少配置文件的体积
  - 默认约定了：打包的入口是`src`->`index.js`
  - 打包的输出文件是`dist`->`main.js`
  - 4.x中新增了mode选项（必选项）development/production
7.`npm i webpack-dev-server -D`运行后，在package.json中的scripts里增加命令，`"dev":"webpack-dev-server`起服务，并且实时更新打包main.js。webpack-dev-server打包好的main.js是托管到了内存中，所以在项目根目录中看不到。可以设置参数，如下：`"dev":"webpack-dev-server --open firefox --port 3000 --hot --progress --compress --host 127.0.0.1`
8.安装`npm i html-webpack-plugin -D`:帮我们把页面生成到内存中去
    在webpack.config.js中配置
  ``` javascript
  const path = require('path')
  /*导入 在内存中自动生成index.html页面的插件*/
  const HtmlWebPackPlugin = require('html-webpack-plugin')
  //创建一个插件的实例对象
  const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname,'src/index.html'),//源文件
    filename:'index.html'//生成的内存中首页的名称
  })
  module.exports = {
      mode: 'development',
      plugins:[
          htmlPlugin   //在这儿加入htmlPlugin
      ]
  }
  ```



## 在项目中使用React
1.运行`npm i react react-dom -S`安装包
  - react：专门用于创建组件和虚拟DOM的，同时组件的生命周期都在这个包中
  - react-dom：专门进行DOM操作的，最主要的应用场景就是React.render()
2.在index.html页面中，创建容器
  ``` html
  <!--容器，将来使用React创建的虚拟DOM元素，都会被渲染到这个指定容器中-->
  <div id="app"></div>
  ```
3.导入包：
  ``` js
  import React from 'react'
  import ReactDom from 'react-dom'
  ```
4.创建虚拟DOM元素：

  ``` js
  /*
  这是创建虚拟DOM元素的API
  第一个参数：字符串类型的参数，表示创建的标签的名称
  第二个参数：对象类型的参数，表示创建的元素的属性节点
  第三个参数：子节点
  */
  const h1 = React.createElement('h1', null, 'h1 text')
const div = React.createElement('div', {
    title: 'div的titile'
}, h1)
  ```
5.渲染
  ``` js
  /*
  渲染虚拟DOM元素
  参数1:表示要渲染的虚拟DOM对象
  参数2:指定容器。注意：这里不能直接放容器元素的id字符串，需要放一个容器的DOM对象
  */
  ReactDom.render(div, document.getElementById("app"))
  ```
6.React中使用JSX语法
  - 在JS中，混合写入类似于HTML的语法，叫JSX语法（符合XML规范的JS）
  - 可以在js文件中，写类似于HTML的标记，然后使用babel来转换这些js中的标签（在js文件中，默认不能写类似于HTML的标记，否则会打包失败）
  - JSX语法的本质：是在运行的时候，被转换成了React.createElement形式来执行


## JSX语法
### 什么是JSX语法
就是符合XML规范的JS语法（语法格式相对来说，要比HTML严谨很多）
### 如何启用JSX语法？
- 安装babel插件
  + 运行`npm i babel-core babel-loader babel-plugin-transform-runtime -D`
  + 运行`npm i babel-preset-env babel-preset-stage-0 -D`
- 安装能够识别转换jsx语法的包`babel-preset-react`
  
  + 运行`npm i babel-preset-react -D`
- 添加`.babelrc`配置文件
  ``` 
  {
  "presets":["env","stage-0","react"],
  "plugins":["transform-runtime"]
  }
  ```
- 在webpack.config.js文件中配置babel-loader
  ``` js
  const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//创建一个插件的实例对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html'
})
//向外暴露一个打包的配置对象；因为webpack是基于Node构建的，所以webpack支持Node API和语法
//webpack默认只能打包处理.js后缀名类型的文件；像.png .vue无法主动处理，所以要配置第三方的loader
module.exports = {
    mode: 'development', //development production
    //在webpack 4.x中，有一个最大的特性，就是约定大于配置。默认打包的入口路径是src->index.js
    plugins: [
        htmlPlugin
    ],
    module: { //所有第三方模块的配置规则
        rules: [ //第三方匹配规则
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/   //必须加入该项，排除node_modules
            }
        ]
    }
}
  ```
### jsx语法的本质
并不是直接把jsx渲染到页面上，而是内部先转换成了createElement形式再渲染的
### 在jsx中混合写入js表达式
需要把js代码写到`{}`中
- 渲染数字
- 渲染字符串
- 渲染布尔值
- 为属性绑定值
- 渲染jsx元素
- 渲染jsx元素数组
- 将普通字符串数组转为jsx数组并渲染到页面上【两种方案】
  forEach
  map

### 在jsx中写注释
推荐使用`{/*这是注释*/}`

### 为jsx中的元素添加class类名
需要使用`className`来替代`class`;`htmlFor`替换label的`for`属性

### jsx添加DOM
在jsx添加DOM的时候，所有的节点，必须有唯一的根元素进行包裹

### jsx标签闭合
在jsx语法中，标签必须成对出现，如果是单标签，则必须自闭合
当编译引擎在编译jsx代码的时候，如果遇到了`<`就会把它当作html代码去编译，如果遇到了`{}`就会把花括号内部的代码当作普通js代码去编译

## React中创建组件

### 第一种-创建组件的方式
使用构造函数来创建组件：如果要接收外界传递的数据，需要在构造函数的参数列表中使用`props`来接收；必须要向外return一个合法的JSX创建的虚拟DOM
``` js
/*创建组件*/
function Hello(){
//return null
return <div>Hello</div>
}
/*为组件传递数据*/
//使用组件并传递props数据
<Hello name={dog.name} age={dog.age}></Hello>
//在构造函数中接收外界传递过来的组件（组件中的props是只读的，不能被重新赋值）
function Hello(props){
    return (<p title={dog.name} age={dog.age}>123</p>)
}
```
- 父组件向子组件传递数据
- 使用{...obj}属性扩散传递数据
- 将组件封装到单独的文件中
- 注意：组件的名称的首字母必须是大写
将组件抽离为单独的jsx文件
``` Hello.jsx
import React from 'react'//组件需要导入React包
function Hello(props){
    return (<p>123{props.name}</p>)
}
export default Hello
```

``` index.js
//导入Hello组件。默认，如果不做单独的配置的话，不能省略.jsx后缀名
import Hello from './components/Hello.jsx'
```
- 如何省略.jsx后缀名
配置webpack从而在导入组件的时候，省略.jsx后缀名
``` webpack.config.js
module.exports = {
	resolve:{
		//表示这几个文件的后缀名，可以省略不写
		extensions:['.js','.jsx','.json']
	}
}
```
- 在导入组件的时候，使用`@`路径符号
配置webpack设置根目录
``` webpack.config.js
const path = require('path')
module.exports = {
	resolve: {
        extensions: ['.js', '.jsx', '.json'],
        //设置别名
        alias: {
            '@': path.join(__dirname, './src')
        }

    }
}
```

### 第二种-创建组件的方式
- class相关知识点
``` js
//创建一个动物类
class Animal {
    //类中的构造器（实例属性）
    constructor(title) {
        this.title = title
    }
    //静态属性
    static info = 'jingtai'
    //实例方法（加到原型链上的方法）
    jiao(){
        console.log('jiao')
    }
    //静态方法
    static show(){
        console.log('show')
    }
}
/*
* 注意：
* 1.在class的{}区间内，只能写构造器、实例方法、静态属性、静态方法
* 2.class关键字内部，还是用的原来的构造函数实现的。所以说，我们把class关键字称作语法糖
*/
```
### 了解ES6中class关键字的使用
1.class中constructor的基本使用
2.使用extends实现子类继承父类
3.子类访问父类上的实例方法
4.constructor构造器中super函数的使用说明
``` js
class Person{
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayHi(){
        return 'Hi'
    }
}
class American extends Person {
    constructor(name,age){
        /*
         * 1.为什么一定要在constructor中调用super
         *   如果一个子类是通过extends关键字继承了父类，那么在子类的constructor构造函数中，必须先调用一下super()
         * 2.super是什么
         *   是一个函数，而且是父类的构造器；子类中的super其实就是父类中构造函数的引用
         * 3.为什么调用了super()之后，实例的属性会变成undefined
         *   没给传值，需要传递参数
         */
        super(name,age)
    }
}
const a1 = new American('Jack', 23)
class Chinese extends Person {
    constructor(name,age,IDNumber){
        super(name,age)
        this.IDNumber = IDNumber
    }
}
const c1 = new Chinese('张三', 23,'120xxxxxxx')
console.log(a1, c1)
```
- 使用class关键字来创建组件
1.最基本的组件结构
``` js
//如果要使用class定义组件，必须让自己的组件继承自React.Component
class 组件名称 extends React.Component{
  //在组件内部，必须有render函数。作用：渲染当前组件的虚拟DOM结构
  render(){
    //render函数中，必须返回合法的JSX虚拟DOM结构
    return <div>这是class创建的组件</div>
  }
}
```
2.为class创建的组件传递props并使用
``` Movie.jsx
import React from 'react'
class Movie extends React.Component{
    render(){
        //在class关键字创建的组件中，如果想使用外界传递过来的props参数，不需要接收，直接通过this.props.xxx来访问
    return <div>Movie--{this.props.name}---{this.props.age}</div>
    }
}
export default Movie

//index.js中使用
ReactDom.render(
{/*这里的Movie标签，实际就是Movie类的一个实例对象 */}
    <Movie {...dog}></Movie>, document.getElementById("app"))
```

3.介绍class创建的组件中this.state
``` Movie.jsx
import React from 'react'
class Movie extends React.Component{
    constructor(){
        //由于Movie组件继承了React.component，所以自定义的构造器中，必须调用super()
        super()
        //只有调用了super()以后，才能使用this关键字
        //this.state={}相当于VUE中的data(){return {}}
        this.state={
            msg:'大家好'
        }
    }
    
    render(){
        this.state.msg = '被修改了'
        //在class关键字创建的组件中，如果想使用外界传递过来的props参数，不需要接收，直接通过this.props.xxx来访问
        return (
            <div>Movie--{this.props.name}---{this.props.age}
                <p>{this.state.msg}</p>
            </div>
        )
    }
}
export default Movie
```
4.两种创建组件方式的对比
注意：使用class关键字创建的组件有自己的私有数据和生命周期函数；但是使用function创建的组件，只有props，没有自己的私有数据和生命周期函数。
  - 用"构造函数"创建出来的组件叫做“无状态组件”
  - 用"class关键字"创建出来的组件叫做“有状态组件”
  - 什么情况下使用有状态组件？什么情况下使用无状态组件？
    + 如果一个组件需要有自己的私有数据，则推荐使用class创建的有状态组件
    + 如果一个组件不需要有私有数据，则推荐使用无状态组件
    + React官方说：无状态组件由于没有自己的state和生命周期函数，所以运行效率会比有状态组件稍微高一些
有状态组件和无状态组件的本质区别：有无state属性和有无生命周期函数
  - 组件中的props和state/data之间的区别
    + props中的数据都是外界传递过来的
    + state/data中的数据都是组件私有的（通过Ajax获取回来的数据）
    + props中的数据都是只读的，不能重新赋值
    + state/data中的数据都是可读可写的



## 在组件中使用style行内样式并封装样式对象
``` CmtList.jsx
import React from 'react'
import CmtItem from '@/components/CmtItem'
export default class CmtList extends React.Component{
    constructor(){
        super()
        this.state = {
CommentList:[
    {
        id:1,user:'张三',content:'shafa'
    },
    {
        id:2,user:'张四',content:'shafa'
    }
]
        }
    }
    render(){
        {/*在JSX中，如果要写行内样式，不能为style设置字符串的值，而是要写成style={ {color:'red} } 在行内样式中，如果是数值类型的样式，则可以不用引号包裹，如果是字符串类型的样式值，必须使用引号包裹*/}
        return (<div>
            <h1 style={ {color:'red',fontSize:'35px',zIndex:3} }>这是评论列表组件</h1>
        {this.state.CommentList.map(item=><CmtItem key={item.id} {...item}></CmtItem>)}
        </div>)
    }
}
```
优化：
将样式对象抽离出来，组成styles.js文件，导出即可

## 使用css样式表美化组件
- `npm i style-loader css-loader -D`
- 配置webpack.config.js（默认webpack打包处理不了css文件，需要在module中的rules配置规则）
  ``` js
  const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//创建一个插件的实例对象
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.html'),
    filename: 'index.html'
})
//向外暴露一个打包的配置对象；因为webpack是基于Node构建的，所以webpack支持Node API和语法
//webpack默认只能打包处理.js后缀名类型的文件；像.png .vue无法主动处理，所以要配置第三方的loader
module.exports = {
    mode: 'development', //development production
    //在webpack 4.x中，有一个最大的特性，就是约定大于配置。默认打包的入口路径是src->index.js
    plugins: [
        htmlPlugin
    ],
    module: { //所有第三方模块的配置规则
        rules: [ //第三方匹配规则
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/ //必须加入该项，排除node_modules
            },
            //打包处理css样式表的第三方loader。处理过程：交给从右往左的use去处理
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }

    }
}
  ```
- 使用
  + import '@/css/cmtList.css'（引入）
  + <h1 className="title">这是评论列表组件</h1>（className写上对应的类名）

- 注意： 直接导入css样式表，默认是在全局上，整个项目都生效
  解决方法：通过modules参数启用模块化（webpack.config.js）
  ``` webpack.config.js
  // css模块化只针对类选择器和id选择器生效；不会将标签选择器模块化
  {
    test:/\.css$/,
    use:['style-loader','css-loader?modules']
  }
  ```
  
  ``` cmtList.jsx
  import cssobj from '@/css/cmtList.css'
   <h1 className={cssobj.title}>这是评论列表组件</h1>
  ```










