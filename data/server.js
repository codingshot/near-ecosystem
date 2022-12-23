const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.sendFile(__dirname + '/combineddata.json');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
