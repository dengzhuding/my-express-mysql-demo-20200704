import http from 'http';
// import '@babel/register';
import app from './app';

export default async function run() {
  const server = http.createServer(app);
  const PORT = process.env.PORT || 8088;
  server.listen(PORT);
  server.on('listening', () => {
    console.log(`server started at http://localhost:${PORT}`)
  });
}
run();