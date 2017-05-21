const Authentication = require('./controller/authentication');
const passportService = require('./services/passport');
const passport = require('passport'); 

// passport tries to create a session by default so make it false 
const requireAuth = passport.authenticate('jwt' , { session : false});

const requireSignin = passport.authenticate('local' , { session : false});


module.exports = (app) => {

    app.get('/' , requireAuth , function(req , res){
                
        res.send(["hi", "hello"]);
        
    }); 
    
    app.post('/signin' , requireSignin , Authentication.signin  )
    
    app.post('/signup' , Authentication.signup); 
    
    
}