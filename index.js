const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index' : req.url)

  fs.readFile(filePath + '.html', (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' })
          res.end(content, 'utf-8')
        })
      } else {
        res.writeHead(500)
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(content, 'utf-8')
    }
  })
})

const PORT = 8080;

server.listen(PORT);