import express from 'express';
import fs from 'fs';
import path from 'path';
import {getLogger, useLogger} from './log/index';
import {initSequelize, getProperties, installModel} from './initialize/index';
import container from './container/index';
import { scopePerRequest, loadControllers } from 'awilix-express';
import {Lifetime, asClass, asValue} from 'awilix';
import { baseMiddleware } from './middleware/base';


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
const init = async function () {
  // 定义模型，注入awilix服务
  // awilix-express 中间件
  app.use(scopePerRequest(container));
  app.use(baseMiddleware(app));
  // 连接数据库
  const sequelize = await initSequelize();
  const config = await getProperties();
  // 初始化models
  installModel();
  // 模型同步
  await sequelize.sync();
  container.register({
    globalConfig: asValue(config),
    sequelize: asValue(sequelize)
  });
  // 依赖注入配置service层和dao层
  container.loadModules(['services/*Service.js', 'daos/*Dao.js'], {
    formatName: 'camelCase',
    register: asClass,
    cwd: path.resolve(__dirname)
  });
  app.use('/api', loadControllers('api/*.js', {
    cwd: __dirname,
    lifetime: Lifetime.SINGLETON
  }));
  app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })
  return config;
}
export {app, init}