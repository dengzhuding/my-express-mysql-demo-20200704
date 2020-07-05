import express from 'express';
import fs from 'fs';
import path from 'path';
import {getLogger, useLogger} from './log/index';
import {initSequelize, getProperties} from './initialize/index';
import container from './container/index';
import { scopePerRequest, loadControllers } from 'awilix-express';
import {Lifetime} from 'awilix';


const ready = async function () {
  let config = null;
  try {
    await initSequelize();
    config = await getProperties()
    console.log('getProperties:', config);
  } catch (e) {
    console.error('初始化失败:', e);
    process.exitCode = 1;
    return
  }
}
ready();
const app = express();
// 跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// 使用logs
useLogger(app);
// awilix-express 中间件
app.use(scopePerRequest(container));
app.use('/api', loadControllers('api/*.js', {
  cwd: __dirname,
  lifetime: Lifetime.SINGLETON
}));
// 其他路由
app.get('/', (req, res, next) => {
  res.write('server has started, welcome!');
  res.end();
});
app.post('/api/test-json', (req, res, next) => {
  fs.readFile(path.join(__dirname, './json/test.json'), (err, data) => {
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
export default app