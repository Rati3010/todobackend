const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticate = (req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if(token){
        const decoded= jwt.verify(token,process.env.jwtkey);
        if(decoded){
            const userID = decoded.userID;
            req.body.userId = userID;
            next();
        }else{
            res.send({'msg':"Login First"});
        }
    }else{
        res.send({'msg':"Login First"});
    }
}

module.exports ={authenticate};