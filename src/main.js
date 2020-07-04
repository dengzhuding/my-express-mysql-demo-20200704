const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const PORT = process.env.PORT || 8088;
server.listen(PORT);
server.on('listening', () => {
  console.log(`server started at localhost:${PORT}`)
})