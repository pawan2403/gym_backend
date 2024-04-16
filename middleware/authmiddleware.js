// const { configDotenv } = require('dotenv');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class jwtMiddleware {
    constructor(){
        this.verifyToken = this.verifyToken.bind(this);
    }

   verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(" ")[1]
    console.log('tttttttt++',token)
    if(token != 'undefined' && token != null){ 
        
        jwt.verify(token, process.env.ACCESS_TOKEN, (err,auth)=>{
            if(err){ 
                res.status(400).send(err)
            } else { 
                res.auth = auth
                return next();
            }
        })
   }
    else {
        console.log("ppppppppppppp")
        res.status(401).send('Invalid Token')
    }
   

}
}

module.exports = jwtMiddleware;