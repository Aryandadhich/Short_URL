const {nanoid}  = require("nanoid")
const URL = require('../models/url') //in model url is the object that let you talk to database

async function HndelGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error : 'url is required' }) // this checkes the user actualy send url in the body
    const shortID = nanoid(8);
  await URL.create({
    shortId : shortID,
    redirectUrl: body.url,
    visitHistory : [],
  })

  return res.json({ shortId: shortID });

}

async function HandleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.status(200).json({totalClicks:result.visitHistory.length, 
    analytics: result.visitHistory,
  })
}

module.exports={
    HndelGenerateNewShortUrl, HandleGetAnalytics
}