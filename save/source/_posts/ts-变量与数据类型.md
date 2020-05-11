---
categories:
  - [TypeScript, notes]
tags:
  - TypeScript
---

## 概述

为了使编写的代码更规范、更有利于维护，增加了类型校验。主要提供了以下数据类型

- 布尔类型（boolean）

- 数字类型（number）

- 字符串类型（string）

- 数组类型（array）

  两种写法：

  + `var arr:number[] = [1,2,3]`
  + `var arr:Array<number> = [1,2,3]`

- 元组类型（tuple）

  属于数组的一种

  `let arr:[number,string] = [123,'is']`

- 枚举类型（enum）

- 任意类型（any）

- null和undefined

- void类型

- never类型

ts代码必须指定类型

## 变量声明的写法

- 语法：

  let 变量名:变量类型 = 值

- 在ts中，为变量指定了类型，就只能给这个变量设置相同类型的值

## 数据类型

- 原有类型
  + string
  + number
  + boolean
  + Array
  + null
  + undefined
  + Symbol
  + Object
- 新增类型
  + tuple元组
  + enum枚举
  + any任意类型
  + never
  + void

