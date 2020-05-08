---
categories:
  - Node.js
    - notes
tags:
  - Node.js
  - mySql-node
---
## 使用Node操作MySQL数据库

- 安装

  ``` shell
  npm i mysql
  ```

- 使用

  ```javascript
  var mysql = require('mysql');
  //1.创建连接
  var connection = mysql.createConnection({
      host: 'localhost',
      user: 'me',
      password: 'secret',
      database: 'my_db'
  });
  //2.连接数据库
  connection.connect();
  //3.执行数据操作
  connection.query('SELECT * FROM `users`', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
  });
  
  connection.query(`INSERT INTO users VALUES(NULL,"admin","123")`, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
  });
  
  
  //4.关闭连接
  connection.end();
  ```

  