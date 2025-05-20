const express = require ("express"); // importing epxress its used to create a server and define routes
const URL = require('../models/url'); // importing the URL model to interact with the database

const router = express.Router(); 

router.get('/',  async (req,res)=>{ 
    const allurls = await URL.find({})
    return res.render("home"), {
        urls: allurls
    }
})
// async function to handle the request and response and 
// let you use await inside the function
// and await paused the code execution until the async task is completed
// and then it will continue to execute the code

module.exports = router;