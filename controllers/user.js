const User = require('../models/user')

async function handleUserSignup(req,res){
    const {name,email,password} = req.body //backend receive data
    await User.create({ //create a new user in the database
        name,
        email,
        password
    });
    return res.render("home"); //render the home page after successful signup
}
module.exports = {
    handleUserSignup
}