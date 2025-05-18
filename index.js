const express = require('express');
const urlroute = require('./routes/url');
const path = require("path");
const { connectToMongodb } = require('./connect');
const app = express();
const Port = 8001;
const URL = require('./models/url');
const staticroute = require('./routes/staticRouter');

// Connect to MongoDB
connectToMongodb('mongodb://127.0.0.1:27017/short-url')
.then(() => {
  console.log("connected to mongodb");
});

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

// Body Parser middleware: Make sure this is above any route handling
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

// Routes
app.use("/url", urlroute);
app.use("/", staticroute); // This serves the static files from the public folder

// Redirecting based on short URL
app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, { $push: { visitHistory: { timestamp: Date.now() } } });
  if(!entry) {
    return res.status(404).json({ error: 'URL not found' });
  }
  res.redirect(entry.redirectUrl); // This will redirect the user to the original URL
});

app.listen(Port, () => {
  console.log(`server is running on ${Port}`);
});
