const express = require ("express"); // importing epxress its used to create a server and define routes
const URL = require('../models/url'); // importing the URL model to interact with the database

const router = express.Router(); 

router.get('/',  async (req,res)=>{ 
  if(!req.user) return res.redirect('/login')
    const allurls = await URL.find({createdBy: req.user._id})
    return res.render("home", {
        urls: allurls,
    });
})

router.get('/signup', (req,res)=>{
  return res.render("signup"); // render the signup page
})

router.get('/login', (req,res)=>{
  return res.render("login"); // render the signup page
})
// async function to handle the request and response and 
// let you use await inside the function
// and await paused the code execution until the async task is completed
// and then it will continue to execute the code

module.exports = router;