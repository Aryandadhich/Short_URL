const sessionIdToUserMap = new Map();
//its a small dictionary jo session id k against user rakhti hai 

function setUser(id, user){
    sessionIdToUserMap.set(id,user);
}
//if any successful login will be there then uska session id or user info is map me daal diya

function getUser(id){
    return sessionIdToUserMap.get(id);
}
//now in next request cookie me se session id uthakar user details nikal liya 

module.exports = {
    setUser,
    getUser,
}


//session id is like unique id to track user after login
// map temporarily stores sessionid => user
//cookie stored in browser to send back on every request
//getuser() used to get user info from sessionid