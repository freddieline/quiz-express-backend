const express = require('express')
const app = express();
const capitals = require('./capitals');

app.get('/', (req, res) => {
  res.send('Api is running');
})

app.get('/capitals', (req, res) => {
  res.json(capitals);
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running")
});