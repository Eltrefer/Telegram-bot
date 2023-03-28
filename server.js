import http from "http"

export class Server {
  constructor(port, hostname) {
    this.port = port;
    this.hostname = hostname
    this.server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.end('Hello, World!\n');
    });
  }
  
  onRequest() {
    this.server.on('request', (request, res) => {
      console.log(request.rawHeaders);
    });
  } 
  
  startListen() {
    this.server.listen(this.port, this.hostname, () => {
      console.log(`Server running at http://${this.hostname}:${this.port}/`);
    })
  } 
}