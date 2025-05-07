const express = require('express');

const app = express();
const Port = 8001;

app.listen(Port, () => {
  console.log(`server is running on ${Port}`)
})