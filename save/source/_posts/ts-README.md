---
categories:
  - [TypeScript, README]
tags:
  - TypeScript
---
## 概述

- 由微软开发的一款开源的编程语言
- 是JavaScript的超集，遵循最新的ES6、ES5规范。扩展了JavaScript的语法
- 更像后端java、C#这样的面向对象的语言，可以让js开发大型企业项目
- 谷歌也在大力支持TypeScript的推广，谷歌的angular2.x就是基于TypeScript语法
- 最新的Vue、React也可以集成TypeScript
- 新增了类型系统和完整的面向对象语法
- 使用TS编写的项目更健硕，且更容易扩展和维护

## 安装 编译
`npm install -g typescript`
`tsc helloworld.ts`

tsc时typescript的编译器，它的作用：负责将ts代码转为浏览器和nodejs识别的js代码

## TypeScript开发工具-Vscode自动编译.ts文件
- 运行`tsc --init` 创建tsconfig.json文件
- 修改tsconfig.json文件，设置js文件夹：`outDir:'./js/'`
- 设置vscode监视任务：选择-》任务-运行任务-监视tsconfig.json

## TypeScript开发工具-Hbuilder自动编译.ts文件

- 在菜单栏，点击工具-插件安装
- 点击下方的浏览Eclipse插件市场，搜索typescript插件进行安装
- 安装完成后重启编译器，点击菜单栏工具-选项，选择编译ts文件
- 在项目上右键点击，配置-enable TypeScript Builder，之后再保存.ts文件时就会自动在当前目录编译出对应的.js文件



## 基础类型

- 布尔类型

  ```ts
  let bool:boolean
  bool = true
  ```

- 数值类型

- 字符串类型

  模版字符串

- 数组类型

  ```ts
  //数组，其中元素都是number类型
  let arr:number[]
  
  let arr:Array<number>
  
  let arr3:(string | number)[]
  
  let arr4:any[] = [1,'a']
  ```

- 元祖类型

  ```ts
  //类型和长度必须与定义一致
  let tuple:[string,number,boolean]
  ```

- 枚举类型

  ```ts
  enum Roles{
      SUPER_ADMIN,
      ADMIN,
      USER
  }
  console.log(Roles.USER) //2
  
  enum Roles{
      SUPER_ADMIN,
      ADMIN = 4,
      USER
  }
  console.log(Roles.SUPER_ADMIN) //0
  console.log(Roles.USER) //5
  ```

- any类型

- void类型

  ```ts
  const consoleText = (text:string):void=>{
      console.log(text)
  }
  console.log(consoleText('a'))
  let v:void
  v = undefined
  ```

- null和undefined

- never类型

  ```ts
  const errorFunc = (message:string):never => {
      throw new Error(message)
  }
  
  
  const infiniteFunc = ():never =>{
      while(true){}
  }
  ```

- object

类型断言

```ts
//写法：<string>target 或者 target as string
const getLength = (target:string | number):number => {
    if((<string>target).length || (target as string).length === 0){
        return (<string>target).length
    }else{
        return target.toString().length
    }
}
```



## Symbol

ES6新增的一种基本数据类型。用来表示一种独一无二的值



## 接口