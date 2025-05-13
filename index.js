const express = require('express');
const urlroute = require('./routes/url')
const path = require("path");
const {connectToMongodb} = require('./connect')
const app = express();
const Port = 8001;
const URL = require('./models/url')

connectToMongodb('mongodb://127.0.0.1:27017/short-url')
.then(()=> {
  console.log("connected to mongodb")
})

app.set("view engine", "ejs");
app.set("views",path.resolve('./views'));

app.use(express.json()) // this is used to parse the json data from the body of the request
app.use("/url", urlroute);

app.get('/:shortId', async (req,res) =>{
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, {$push : {
    visitHistory : {timestamp: Date.now()}
  }})
  res.redirect(entry.redirectUrl) // this will redirect the user to the original url
})

app.listen(Port, () => {
  console.log(`server is running on ${Port}`)
})