const mongoose = require('mongoose'); //moongose a lib used to inetract with mongodb using model and schema
const userSchema = new mongoose.Schema({  // schema is a blueprint for the data we are creating one for user collection
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
},{timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;