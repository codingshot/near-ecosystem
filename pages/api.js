const express = require('express');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/data', (req, res) => {
    fs.readFile('../data/combineddata.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(JSON.parse(data));
      }
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

