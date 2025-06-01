const express = require('express')
const {HndelGenerateNewShortUrl, HandleDeleteShortUrl,HandleGetAnalytics} = require("../controllers/url")
const router = express.Router();

router.post('/',HndelGenerateNewShortUrl)


router.get('/analytics/:shortId',HandleGetAnalytics)
//delete the short url
router.post('/delete/:shortId',HandleDeleteShortUrl);

module.exports = router;