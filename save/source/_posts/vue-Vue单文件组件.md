---
categories:
  - [VUE, VUE 2, notes, 单文件组件]
tags:
  - VUE
  - VUE 2
---
## 传统组件的问题和解决方案

### 问题

1. 全局定义的组件必须保证组件的名称不重复
2. 字符串模板缺乏语法高亮，在HTML有多行的时候，需要用到丑陋的\
3. 不支持CSS意味着当HTML和Javascript组件化时，CSS明显被遗漏
4. 没有构建步骤限制，只能使用HTML和ES5 Javascript，而不能使用预处理器如Babel

### 解决方案

针对传统组件的问题，Vue提供了一个解决方案——使用Vue单文件组件



## Vue单文件组件的基本用法

### 单文件组件的组成结构

- template组件的模板区域
- script业务逻辑区域
- style样式区域