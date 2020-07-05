// 日志模块
import log4js from 'log4js';
// import path from 'path';

const config = {
  replaceConsole: false,
  pm2: false,
  appenders: {
      stdout: {//控制台输出
          type: 'console'
      },
      req: { //请求转发日志
          type: 'dateFile', //指定日志文件按时间打印
          filename: 'logs/reqlog/req', //指定输出文件路径
          pattern: 'yyyy-MM-dd.log',
          alwaysIncludePattern: true
      },
      err: { //错误日志
          type: 'dateFile',
          filename: 'logs/errlog/err',
          pattern: 'yyyy-MM-dd.log',
          alwaysIncludePattern: true
      },
      oth: { //其他日志
          type: 'dateFile',
          filename: 'logs/othlog/oth',
          pattern: 'yyyy-MM-dd.log',
          alwaysIncludePattern: true
      }

  },
  // appenders: [
  //   {type: 'console'},
  //   {
  //     type: 'dataFile',
  //     filename: path.join(process.cwd(), './dist/logs/log.log'), 
  //     maxLogSize: 1024,
  //     backups:3,
  //     category: 'normal' 
  //   }
  // ],
  categories: {
    default: { appenders: ['stdout', 'req'], level: 'debug' },
    err: { appenders: ['stdout', 'err'], level: 'error' }
  }
};
log4js.configure(config);
const getLogger = function (name) {//name取categories项
  return log4js.getLogger(name || 'default')
};
const useLogger = function (app, logger) {
  app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
  //自定义输出格式
      format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'
  }))
};

export {getLogger, useLogger}