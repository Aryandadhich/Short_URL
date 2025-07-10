// //const sessionIdToUserMap = new Map(); no meed of state
// //its a small dictionary jo session id k against user rakhti hai 
// const jwt = require("jsonwebtoken");
// const secret = "Piyush$123@$";
// function setUser(user){
//     return jwt.sign(user.toJSON(),secret)
// }
// //if any successful login will be there then uska session id or user info is map me daal diya

// function getUser(token){
//     if(!token) return null;
//     return jwt.verify(token,secret)
// }
// //now in next request cookie me se session id uthakar user details nikal liya 

// module.exports = {
//     setUser,
//     getUser,
// }


// //session id is like unique id to track user after login
// // map temporarily stores sessionid => user
// //cookie stored in browser to send back on every request
// //getuser() used to get user info from sessionid

const jwt = require("jsonwebtoken");
const secret = "Piyush$123@$";

function setUser(user) { //set user will create token for us 
    return jwt.sign(
    {
        _id: user._id,
        email: user.email
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT Verify Error:", err.message);
        return null;
    }
}

module.exports = { setUser, getUser };
