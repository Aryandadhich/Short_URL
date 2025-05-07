const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
     shortId : {
        type: string,
        unique: true,   
        required: true,
    },
    redirectUrl : {
        type: string,
        required: true,
    },
    visitHistory : [{ timestamp : {type: Number}}]

}, { timestamps: true });

const URL = mongoose.model('url', urlSchema)
module.exports = URL;