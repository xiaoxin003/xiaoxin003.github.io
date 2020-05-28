---
categories:
  - [webpack, README]
tags: 
  - webpack
---
## 当前Web开发面临的困境

- 文件依赖关系错综复杂
- 静态资源请求效率低
- 模块化支持不友好
- 浏览器对高级Javascript特性兼容程度较低
- etc...



## 概述

webpack是一个流行的**前端项目构建工具**（打包工具），可以解决当前Web开发中所面临的困境

webpack提供了**友好的模块化支持**，以及**代码压缩混淆**、**处理js兼容问题**、**性能优化**等强大的功能，从而让程序员把工作的重心放到具体的功能实现上，提高了开发效率和项目的可维护性

目前绝大多数企业中的前端项目，都是基于webpack进行打包构建的



## 基本使用

1. 创建列表隔行变色项目

   - 新建项目空白目录，并运行npm init -y命令，初始化包管理配置文件package.json
   - 新建src源代码目录
   - 新建src/index.html首页
   - 初始化首页基本的结构
   - 运行npm install jquery -S命令，安装jquery
   - 通过模块化的形式，实现列表隔行变色效果

   存在兼容性问题，浏览器对ES6的模块化不友好

2. 在项目中安装和配置webpack

   - 运行命令，安装webpack相关的包

     ```shell
     npm install webpack webpack-cli -D
     ```

   - 在项目根目录中，创建名为webpack.config.js的webpack配置文件

   - 在webpack的配置文件中，初始化如下基本配置

     ```js
     module.exports = {
     	mode: 'development'	//mode用来指定构建模式
     }
     ```

   - 在package.json配置文件中的scripts节点下，新增dev脚本如下

     ```js
     "scripts": {
         "dev": "webpack" //script节点下的脚本，可以通过npm run执行
       }
     ```

   - 在终端中运行npm run dev命令，启动webpack进行项目打包

3. 配置打包的入口与出口

   webpack的4.x版本中默认约定

   - 打包的入口文件为src/index.js
   - 打包的出口文件为dist/main.js

   如果要修改打包的入口与出口，可以在webpack.config.js中新增如下配置信息

   ```js
   //导入node.js中专门操作路径的模块
   const path = require('path')
   module.exports = {
   	//打包入口文件的路径
   	entry: path.join(__dirname,'./src/index.js'),
   	output: {
   		//输出文件的存放路径
   		path: path.join(__dirname,'./dist'),
   		//输出文件的名称
   		filename: 'bundle.js'
   	}
   }
   ```

4. 配置webpack的自动打包功能

   - 运行命令，安装支持项目自动打包的工具

     ```shell
     npm install webpack-dev-server -D
     ```

   - 修改package.json里的scripts中的dev命令如下

     ```js
     "scripts": {
         "dev": "webpack-dev-server" //script节点下的脚本，可以通过npm run执行
       }
     ```

   - 将src/index.html中，script脚本的引用路径修改为'/bundle.js'

   - 运行npm run dev命令，重新进行打包

   - 在浏览器中访问`http://127.0.0.1:8080/`，查看自动打包效果

   注意：

   - webpack-dev-server会启动一个实时打包的http服务器
   - webpack-dev-server打包生成的输出文件，默认放到了项目根目录中，而且是虚拟的，看不见的

5. 配置html-webpack-plugin生成预览页面（访问根路径，直接访问到页面，无需再点src）

   - 运行命令，安装生成预览页面的插件

     ```shell
     npm install html-webpack-plugin -D
     ```

   - 修改webpack.config.js文件头部区域，添加如下配置信息

     ```js
     //导入生成预览页面的插件，得到一个构造函数
     const HtmlWebpackPlugin = require('html-webpack-plugin')
     //创建插件的实例对象
     const htmlPlugin = new HtmlWebpackPlugin({
         template: './src/index.html', // 指定要用到的模板文件
         filename: 'index.html' // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示(默认会打开index.html)
     })
     ```

   - 修改webpack.config.js文件中向外暴露的配置对象，新增如下配置节点：

     ```javascript
     module.exports = {
         plugins: [htmlPlugin] //plugins数组是webpack打包期间会用到的一些插件列表
     }
     ```

6. 配置自动打包相关的参数

   ```js
   //package.json中的配置
   /*
   	--open 打包完成后自动打开浏览器页面
   	--host 配置IP地址
   	--port 配置端口
   */
   "scripts": {
       "dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"
   }
   ```

7. 加载器

   - 通过loader打包非js模块

     在实际开发过程中，webpack默认只能打包处理以.js后缀名结尾的模块，其他非.js后缀名结尾的模块，webpack默认处理不了，需要调用loader加载器才可以正常打包，否则会报错

     loader加载器可以协助webpack打包处理特定的文件模块，比如

     + less-loader可以打包处理.less相关的文件
     + sass-loader可以打包处理.scss相关的文件
     + url-loader可以打包处理css中与url路径相关的文件

   - loader的调用过程
      ![调用过程](https://gitee.com/xiaoxin1993/imgs/raw/master/blog/posts/content/webpack.png)
		
    - 加载器的基本使用
   
      * 打包处理css文件
   
        1. 运行命令，安装处理css文件的loader
   
           ```shell
           npm i style-loader css-loader -D
           ```
   
        2. 在webpack.config.js的module->rules数组中，添加loader规则如下
   
           ```js
           //所有第三方文件模块的匹配规则
           module: {
             rules: [
               //其中test表示匹配的文件类型，use表示对应要调用的loader
               { test: /\.css$/, use: ['style-loader', 'css-loader'] }
             ]
           }
           ```
   
           注意： 
   
           - use数组中指定的loader顺序是固定的
           - 多个loader的调用顺序是：从后往前调用
   
      * 打包处理less文件
   
        1. 运行`npm i less-loader less -D`命令(其中less是less-loader的内置依赖项)
   
        2. 在webpack.config.js的module->rules数组中，添加loader规则如下
   
           ```javascript
           module:{
           	rules: [
           		{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
           
           	]
           }
           ```
   
      * 打包处理scss文件
   
        1. 运行`npm i sass-loader node-sass -D` 命令(其中node-sass是sass-loader的内置依赖项)
   
        2. 在webpack.config.js的module->rules数组中，添加loader规则如下
   
           ```javascript
           module:{
           	rules: [
        		{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
           
           	]
           }
           ```
           
        
      * 配置postCSS自动添加css的兼容前缀
      
        1. 运行`npm i postcss-loader autoprefixer -D`命令
      
        2. 在项目根目录中创建postcss的配置文件postcss.config.js，并初始化如下配置
      
           ```js
           //导入自动添加前缀的插件
           const autoprefixer = require('autoprefixer')
           module.exports = {
               //挂载插件
               plugins: [autoprefixer]
           }
           ```
      
        3. 在webpack.config.js的module->rules数组中，修改css的loader规则如下
      
           ```js
           module: {
             rules: [
               { test: /\.css$/, use: ['style-loader', 'css-loader','postcss-loader'] }
             ]
           }
           ```
      
      * 打包样式表中的图片和字体文件
      
        1. 运行`npm i url-loader file-loader -D`命令
      
        2. 在webpack.config.js的module->rules数组中，添加loader规则如下
      
           ```js
           module: {
             rules: [
               test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
               //?之后的是loader的参数项。limit用来指定图片的大小，单位是字节（byte），只有小于limit大小的图片，才会被转为base64图片
               // use接收可以是数组也可以是loader的名称字符串
               use: 'url-loader?limit=12034'
             ]
           }
           ```
      
      * 打包处理js文件中的高级语法
      
        1. 安装babel转换器相关的包
      
           ```shell
           npm i babel-loader @babel/core @babel/runtime -D
           ```
      
        2. 安装babel语法插件相关的包
      
           ```shell
           npm i @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
           ```
      
        3. 在项目根目录中，创建babel配置文件babel.config.js并初始化基本配置如下：
      
           ```js
           module.exports = {
               presets: ['@babel/preset-env'],
               plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
           }
           ```
      
        4. 在webpack.config.js的module->rules数组中，添加loader规则如下：
      
           ```js
           module: {
             rules: [{
               test: /\.js$/,
               use: 'babel-loader',
               //exclude为排除项，表示babel-loader不需要处理node_modules中的js文件
               exclude: /node_modules/ 
             }]
           }
           ```
   



## webpack中配置vue组件的加载器

1. 运行命令

   ```shell
   npm i vue-loader vue-template-compiler -D
   ```

2. 在webpack.config.js配置文件中，添加vue-loader的配置项如下：

   ```javascript
   const VueLoaderPlugin = require('vue-loader/lib/plugin')
   module.exports = {
       plugins: [
         //...其他插件
         new VueLoaderPlugin()//确保引入这个插件
       ], 
       module: {
           rules: [
             //...其他规则
             {
               test: /\.vue$/,
               loader: 'vue-loader'
             }
           ]
       }
   }
   ```



## 在webpack项目中使用Vue

1. 运行npm i vue -S安装vue

2. 在src/index.js入口文件中，通过`import Vue from 'vue'`来导入vue构造函数

3. 创建vue的实例对象，并指定要控制的el区域

4. 通过render函数渲染App根组件

   ```js
   //1.导入Vue构造函数
   import Vue from 'vue'
   //2.导入单文件组件
   import App from './App.vue'
   const vm = new Vue({
     	//3.指定vm实例要控制的页面区域
       el: "#app",
     	//4.通过render函数，把指定的组件渲染到el区域中
       render: h => h(App)
   })
   ```



## webpack打包发布

上线之前需要通过webpack将应用进行整体打包，可以通过package.json文件配置打包命令

```
//在package.json文件中配置webpack打包命令
//该命令默认加载项目根目录中的webpack.config.js配置文件
"scripts": {
	//用于打包的命令
	"build": "webpack -p"
}
```

## webpack打包vue项目之后如何启动&注意事项

前端代码没有服务器可以部署到express服务器上运行
1.执行：npm run build，打包后生成dist文件夹
2.安装express-generator生成器。执行`npm install express-generator -g`进行安装
3.创建一个express项目。执行`express expressDemo`(expressDemo是项目名)
4.进入expressDemo目录，安装项目依赖
  ``` shell
  cd expressDemo
  npm install
  ```
5.把dist目录下的所有文件复制到express项目的public文件夹下
6.运行`npm start`启动expressDemo
7.打开浏览器，输入`http://localhost:3000`即可