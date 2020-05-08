---
categories:
  - VUE
    - VUE 2
tags:
  - VUE
---
## 单页面应用程序

- Single Page Application（SPA）

### 网站的交互方式

- 经典的多页面

  > 例如：京东商城、唯品会

  + 前后端糅合在一起，开发和维护效率低下

  + 用户体验一般，点击刷新跳转，等待时间过长
  + 每个页面都需要重新加载渲染，速度慢
  + 有利于SEO搜索引擎搜索（蜘蛛会爬链接）

- 现代式的单页面

  > 例如：网易云音乐、coding

  + 开发方式好，前后端分离，开发效率高，可维护性好

  + 用户体验好，就像一个原声的客户端软件一样使用
  + 只需要加载渲染局部视图即可，不需要整页刷新
  + 开发技术复杂，所以诞生了一堆的开发框架
    * Angular
    * React
    * Vue
  + 单页面技术其实已经很成熟了，但是都无法兼容低版本浏览器（现在除了一些电商网站，其实已经很少有系统需要去兼容低版本浏览器），大部分都是ie9以上
  + 单页面由于数据都是异步加载过来的，所以不会被搜索引擎搜索到，不利于SEO
  + 手机Web网页
  + 管理系统



## 单页面开发模拟实现

```js
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <div class="header">头部</div>
        <div>
            <ul>
                <li><a href="#/">发现音乐</li>
                <li><a href="#/my-music">我的音乐</li>
                <li><a href="#/friend">朋友</li>
            </ul>
        </div>
        <!--其他页面都需要显示在这个容器中-->
        <div class="container"></div>
        <script src="jquery.js"></script>
        <script src="art-template/lib/template-web.js"></script>
        <script>
            /*
        通过注册window.onhashchange事件来监听hash的改变
        url地址发生改变了，就解析hash中的路径标识
        根据不同的路径标识渲染不同的页面到单页面中的容器中
        */
            window.onhashchange = function () {
                var hash = window.location.hash.substr(1)
                if (hash === '/') {
                    $.get('./find-music.html', function (data) {
                        $('.container').html(data)
                    })
                } else if (hash === '/my-music') {
                    $.get('./my-music.html', function (data) {
                        $('.container').html(data)
                    })
                } else if (hash === '/friend') {
                    $.get('./friend.html', function (data) {
                        $('.container').html(data)
                    })
                }
            }
        </script>
    </body>

</html>
```

单页面开发很复杂，需要一定的技术支撑，所以就有了前端三大开发框架

- angular
  + 09年诞生
  + Google
  + 目的就是让我们开发单页面应用程序更方便
  + 最主要的为前端带来了MVVM开发模式
  + MVVM一句话，数据驱动视图，不操作DOM
- react
  + Facebook公司自己也开发了一个Web框架
  + 组件化
- vue
  + Vue作者：尤雨溪
  + 早期由个人开发
  + Vue借鉴了angular和react之所长，后起之秀



## Vue.js介绍

一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。



### class和style

- 绑定HTML Class

  - 对象语法

    + 我们可以传给 `v-bind:class` 一个对象，以动态地切换 class：

    ```javascript
    <div v-bind:class="{ active: isActive }"></div>
    ```

  - 数组语法
  
    + 我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：
  
    ```javascript
    <div v-bind:class="[activeClass, errorClass]"></div>
    data: {
      activeClass: 'active',
      errorClass: 'text-danger'
    }
    ```

- 绑定内联样式

  + 对象语法

    `v-bind:style` 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

    ```
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    data: {
      activeColor: 'red',
      fontSize: 30
    }
    ```

    直接绑定到一个样式对象通常更好，这会让模板更清晰：

    ```
    <div v-bind:style="styleObject"></div>
    data: {
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
    ```

    

  - 数组语法

    `v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

    ```
    <div v-bind:style="[baseStyles, overridingStyles]"></div>
    ```



### 指令

- v-text

  ```
  //解决浏览器闪烁问题
  <h1 v-text="message"></h1>
  ```

  

- v-cloak

  ```
  //浏览器在解析的过程中，发现具有v-cloak的属性隐藏不显示,所以你就看不见这个{{}}闪烁的问题了。当Vue实例编译完成结束之后，Vue会自动把v-cloak样式移除
  //由于{{}}使用的比较多，如果都使用v-text又比较麻烦，所以Vue提供了一个指令v-cloak
  <style>
  	[v-cloak]{
  		display:none
  	}
  </style>
  <div id="app" v-cloak>
  {{message}}
  </div>
  ```

  

### 计算属性

在模板中放入太多的逻辑会让模板过重且难以维护

当你想要在模板中多次引用此处功能时，就会更加难以处理

所以，对于任何复杂逻辑，都应当使用计算属性

两种方式：

- 方法

  methods：每使用一次就调用一次

- 计算属性

  + 解决性能问题

    ```
    computed:{
    	//该成员就是一个方法，但是在使用时，要当作属性使用，不能调用
    	//简写，作为get方法
    	fn(){
    		return fn
    	}
    	
    	//完整写法
    	fn: {
    		//当你访问时，会自动调用get方法
    		get(){
    		
    		},
    		//当你 实例.fn = xxx会自动调用set方法
    		set(){
    			
    		}
    	}
    }
    ```

    

用双向数据绑定和计算属性实现全选功能

```js
<input type="checkbox" v-model="toggleAllStat">

computed: {
  toggleAllStat: {
    get() {
      //计算属性知道它依赖了todos，当todos发生变化，计算属性会重新计算
      return this.todos.every(t => t.complete)
    },
      set() {
        //表单控件checkbox双向绑定了toggleAllStat，所以checkbox的变化会调用set方法
        //在set中，我们要做的就是
        // 1.得到当前checkbox的选中状态
        // 2.把所有任务项的选项状态都设置为toggle-all的选中状态
        const checked = !this.toggleAllStat
        this.todos.forEach(item => {
          item.completed = checked
        })
      }
  }
}
```

