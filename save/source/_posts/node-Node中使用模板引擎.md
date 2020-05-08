---
categories:
  - Node.js
tags:
  - Node.js
  - Node模板引擎
---
## 基于art-template的模板引擎

在Node中，有很多第三方模板引擎都可以使用，例如：ejs、jade（pug）、handlebars、nunjucks

用法：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>大家好，我叫{{ name }}</p>
        <p>我的爱好是{{ each hobbies }}{{ $value }}{{ /each }}</p>
        <script>
            var foo = '{{ title }}'
        </script>
    </body>
</html>
```

```javascript
var template = require('art-template')
var fs = require('fs')
fs.readFile('./artTemplate.html', function (err, data) {
    if (err) {
        console.log('err')
        return
    }
    // data是二进制数据，而模板引擎接收的是字符串
    // 需要处理转为字符串，才可以给模板引擎
    var ret = template.render(data.toString(), {
        title: 'art-template',
        name: 'Jack',
        hobbies: [
            '唱歌',
            '跳舞'
        ]
    })
    console.log(ret)
  /*
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>大家好，我叫Jack</p>
        <p>我的爱好是唱歌跳舞</p>
        <script>
            var foo = 'art-template'
        </script>
    </body>
</html>
  */
})
```

### art-template的模板继承和子模板

extend-include

#### 模板继承

**标准语法**

```javascript
{{extend './layout.art'}}
{{block 'head'}} ... {{/block}}
```

模板继承允许你构建一个包含你站点共同元素的基本模板“骨架”。范例：

```javascript
<!--layout.art-->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{block 'title'}}My Site{{/block}}</title>

    {{block 'head'}}
    <link rel="stylesheet" href="main.css">
    {{/block}}
</head>
<body>
    {{block 'content'}}{{/block}}
</body>
</html>
                         
                         
<!--index.art-->
{{extend './layout.art'}}

{{block 'title'}}{{title}}{{/block}}

{{block 'head'}}
    <link rel="stylesheet" href="custom.css">
{{/block}}

{{block 'content'}}
<p>This is just an awesome page.</p>
{{/block}}
```

渲染 index.art 后，将自动应用布局骨架。

#### 子模板

**标准语法**

```javascript
{{include './header.art'}}
{{include './header.art' data}}
```



```javascript
//模板页
layout.html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{block 'title'}}My Site{{/block}}</title>

    {{block 'head'}}
    <link rel="stylesheet" href="main.css">
    {{/block}}
</head>
<body>
    {{ include './header.html' }}

		//留一个坑
    {{block 'content'}}{{/block}}

    {{ include './footer.html' }}
</body>
</html>
                         
//子页
{{ extend './layout.html' }}

{{ block 'content' }}
<div>
	<h1>填坑内容</h1>
</div>
{{ /block }}

```

