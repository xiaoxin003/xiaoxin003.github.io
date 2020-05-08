---
categories:
  - VUE
    - VUE 2
tags:
  - VUE
---
## 基本用法

Vue脚手架用于快速生成Vue项目基础架构

### 使用步骤

1. 安装Vue脚手架

   ```shell
   npm install -g @vue/cli
   ```

2. 查看版本

   ```shell
   vue -V
   ```



### 创建vue项目

- 基于交互式命令行的方式

  ```shell
  vue create my-project
  ```

- 基于图形化界面的方式

  ```shell
  vue ui
  ```

- 基于2.x的旧模板

  ```shell
  npm install -g @vue/cli-init
  vue -init webpack my-project
  ```



### Vue脚手架生成的项目结构分析

![截屏2020-04-20下午9.40.25](/Users/yongxinyuan/Library/Application Support/typora-user-images/截屏2020-04-20下午9.40.25.png)



### Vue脚手架的自定义配置

1. 通过package.json配置项目

   ```js
   //必须是符合规范的json语法
   "vue": {
     "devServer": {
       "port": 8888,
       "open": true
     }
   }
   ```

   **注意**：不推荐使用这种配置方式，因为package.json主要用来管理包的配置信息；为了方便维护，推荐将vue脚手架相关的配置，单独定义到vue.config.js配置文件中

2. 通过单独的配置文件配置项目

   1. 在项目的根目录创建文件vue.config.js

   2. 在该文件中进行相关配置，从而覆盖默认配置

      ```js
      //vue.config.js
      module.exports = {
      	devServer: {
      		port: 8888,
          //自动打开浏览器
          open: true
      	}
      }
      ```

      

