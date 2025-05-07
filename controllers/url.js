const {nanoid}  = require("nanoid")
const URL = require('../models/url') //in model url is the object that let you talk to database

async function HndelGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : 'url is required' }) // this checkes the user actualy send url in the body
  const shortID = nanoid(8);
  await URL.create({
    shortId : shortID,
    redirectURL: body.url,
    visitHistory : [],
  })

  return res.json({id : shortId})
}

module.exports={
    HndelGenerateNewShortUrl
}