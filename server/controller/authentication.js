const jwt = require('jwt-simple'); 
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime(); 
    return jwt.encode({ sub : user.id , iat : timestamp } , config.secret); 
}



exports.signup = (req, res) => {
    
    // See if a given email exists 
    
    const { email , password } = req.body ;
    
    if(!email || !password){
        res.status(422).send({error : 'You must provide email and password'});
    }
    
    
    User.findOne( { email } )
         .then( user => {
           if(user){
               
                res.status(422).send({error : 'Email is in use'}); 
               
           }else{
               
                User.create( {email , password} )
                    .then( user => {
                    
                    res.status(202).send( { token : tokenForUser(user) });
                    
                }); 
           }
          })
           .catch( () => {
            console.log("Connection to database failed");
         });
    
    
    // if a user with email does exist , return an error 
    
    
    //if a user with email does not exist , create and save record 
    
    
    // Respond to request indicating the user was created 
        
    
}

exports.signin = ( req , res , next ) => {
    // User has already had their email and password auth'd 
    // We jus need to give them a token 
    
    res.status(202).send( { token : tokenForUser(req.user) });
    
}




