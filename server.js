 const http = require('http');
//import * as http from 'http';

// fetch('http://nginx')
// .then(response => response.json())
// .then(json => console.log(json))

const server = http.createServer((req, res) => {
  res.end('hello <h1>server 1</h1>')
});

server.listen(3000, () => { console.log('up on 3000');})