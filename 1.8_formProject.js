import http from 'http';
import fs from 'fs/promises';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  function htmlBody() {
    res.write(`<form action="/message" method="post">
               <input type="text" name="message">
               <button type="submit">Send</button>
               </form>`);
  }

  if (req.url === '/' && req.method === 'GET') {
    htmlBody();
    res.end();
  } else if (req.url === '/message' && req.method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', async () => {
      let parseBody = Buffer.concat(body).toString();
      let data = parseBody.split('=')[1];

     await fs.writeFile('./message.txt', data);
     let fileData = await fs.readFile('./message.txt', 'utf8');

      htmlBody();
      res.write(`<p>${fileData}</p>`);
      res.end();
    });
  }
});

server.listen(4000, () => {
  console.log('Server started running...........');
});
