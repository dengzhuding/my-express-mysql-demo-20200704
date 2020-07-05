// 通用工具方法
import properties from 'properties';
import path from 'path';
import {Sequelize} from 'sequelize'


/**
 * 获取config.properties，返回Promise
 */ 
let configProperties = null
export function getProperties() {
  if (configProperties) {
    return Promise.resolve(configProperties)
  }
  const propertiesOptions = {
    path: true,
    namespaces: true,
    sections: true
    // variables: true,
    // include: true
  }
  return new Promise((resole, reject) => {
    properties.parse (path.join(process.cwd(), './config.properties'), propertiesOptions, (err, obj) => {
      if (err) {
        reject(err);
      }
      configProperties = obj;
      resole(obj);
    });
  })
}

/**
 * 连接到数据库，返回Sequelize实例
 */
let sequelize = null
export async function initSequelize() {
  if (!configProperties) {
    // 获取配置
    await getProperties()
  }
  const {host, port, database, username, password, pool, dialect} = configProperties.mysql;
  const defaultPreset = {
    host: 'localhost',
    dialect: 'mysql',
    // operatorsAliases: false,
    port: 3306,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  sequelize = new Sequelize(database, username, password.toString(), Object.assign({}, defaultPreset, {
    host,
    port
  }));
  // sequelize = new Sequelize(database || 'test', username || 'root', password || 'root', {
  //   host: host || 'localhost',
  //   port: port || 3306,
  //   operatorsAliases: false,
  //   dialect: dialect || 'mssql',
  //   pool: Object.assign({min: 0, max: 20, acquire: 30000, idle: 10000}, pool || {})
  // });
  // 测试连接
  console.log('开始测试连接');
  await sequelize.authenticate();
  console.log('连接成功');
}
