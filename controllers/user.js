const {v4: uuidv4} = require("uuid")
const {setUser} = require("../Service/auth")
const User = require('../models/user')

async function handleUserSignup(req,res){
    const {name,email,password} = req.body //backend receive data//check if all fields are filled
    try { 
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.render("signup", {error: "email alredy exist"})
        }
        await User.create({ //create a new user in the database
        name,
        email,
        password,
    });
    return res.redirect("/"); //redirect to home page after successful signup
}catch(err){
         return res.render("signup",{error: "something went wrong"})
    }
}

async function handleUserLogin(req,res){
    const {email,password}= req.body; //backend receive data
    try{
        const existinguser = await User.findOne({email,password});
        if(!existinguser){
            return res.render("login",{
                error: "invalid email or password"
            }); 
        }//render the home page after successful login
        //if all correct in your login then i will create a session id for you
        const sessionId = uuidv4();
        setUser(sessionId, existinguser)
        res.cookie('uid',sessionId)
        return res.redirect("/")
    }catch(err){
        return res.render("login",{error: "something went wrong"})
    }
}
module.exports = {
    handleUserSignup,handleUserLogin
}