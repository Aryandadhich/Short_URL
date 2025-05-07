const express = require('express')
const {HndelGenerateNewShortUrl, HandleGetAnalytics} = require("../controllers/url")
const router = express.Router();

router.post('/',HndelGenerateNewShortUrl)


router.get('/analytics/:shortId',HandleGetAnalytics)

module.exports = router;