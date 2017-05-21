const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose; 

// define a model 

const userSchema = new Schema({
    
    email : {
        type : String , 
        unique : true , 
        lowercase : true
    } , 
    password : String

});

// On Save Hook  , encrypt password 
//Before saving a model , run this model 
userSchema.pre('save' , function(next){
    
// get access to the user model
    const user = this; 
    
// generate a salt     
    bcrypt.genSalt(10, function(err , salt){
        
        if(err) { return next(err); }
       
        // hash our password using salt
        bcrypt.hash( user.password , salt,  null , function(err , hash){
          
            if(err) { return next(err); }
            
           //  overwrite plain password with encrypted password
            user.password = hash; 
            next();
            
        });
        
    });
     
});


userSchema.methods.comparePassword = function(candidatePassword , callback){
    
    bcrypt.compare( candidatePassword , this.password , function(err , isMatch){
        
        if( err) { return callback(err); }
        
        callback(null , isMatch);
        
    });
    
}


// Create a model class 

const ModelClass = mongoose.model('user', userSchema); 

// Export the model 

module.exports = ModelClass; 
