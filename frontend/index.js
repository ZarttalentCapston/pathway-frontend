// frontend/index.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from frontend!');
});

app.listen(port, () => {
  console.log(`frontend server running on port ${port}`);
});

