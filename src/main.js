import http from 'http';
// import '@babel/register';
import {app, init} from './app';

export default async function run() {
  let config = null
  try {
    config = await init();
  } catch (e) {
    console.log('init fail:', e);
    process.exitCode = 1
    return
  }
  const server = http.createServer(app);
  const {host, port} = config.server;
  const option = {
    host: host || 'localhost',
    port: process.env.PORT || port || 8088
  }
  server.listen(option);
  server.on('listening', () => {
    console.log(`server started at http://${option.host}:${option.port}`)
  });
}
run();