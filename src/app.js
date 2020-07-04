const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
// 跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.get('/', (req, res, next) => {
  res.write('server has started, welcome!');
  res.end();
});
app.post('/api/test-json', (req, res, next) => {
  const testData = fs.readFile(path.join(__dirname, './json/test.json'), (err, data) => {
    if (err) {
      throw err;
    }
    res.setHeader('Content-Type', 'application/json')
    res.write(data);
    res.end();
  })
});
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
module.exports = app