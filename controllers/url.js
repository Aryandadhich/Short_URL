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
    createdBy : req.user._id,
  })
  const allUrls = await URL.find({createdBy: req.user._id}) // this will get all the urls from the database
  return res.render('home',{
    id : shortID,
    urls: allUrls,  
  })

}

async function HandleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.status(200).json({totalClicks:result.visitHistory.length, 
    analytics: result.visitHistory,
  })
}

async function HandleDeleteShortUrl(req,res){
      const shortId = req.params.shortId; //this grab shortid from url 
      await URL.deleteOne({shortId});
      const allUrls = await URL.find({});

      return res.render('home',{
        urls: allUrls,
        id:null //optional clears the generated id 
      });
}
module.exports={
    HndelGenerateNewShortUrl, HandleGetAnalytics,HandleDeleteShortUrl
}