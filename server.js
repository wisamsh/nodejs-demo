const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res)=> {
    console.log(req);
});

server.listen(3000, 'localhost', ()=>{
console.log('server Listening on port 3000...')
});