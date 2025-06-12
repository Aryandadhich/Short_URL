const express = require('express');

const path = require("path");
const cookieParser = require('cookie-parser')
const { connectToMongodb } = require('./connect');
const {restrictToLoggedinUserOnly} = require('./middleware/auth')

const URL = require('./models/url');

// Importing routes
const urlroute = require('./routes/url');
const staticroute = require('./routes/staticRouter');
const userroute = require('./routes/user');



const app = express();
const Port = 8001;

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
app.use(cookieParser());
// Routes
app.use("/url", restrictToLoggedinUserOnly, urlroute);
app.use("/", staticroute); // This serves the static files from the public folder
app.use("/user",userroute);


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
