const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const profileSchema = new Schema( { 
    gender : { 
        type : String ,
        enum : ["Male" , "Female" , "Other"]
    }, 

    dob :  {
        type : String , 
    }, 

    about : {
        type : String ,  
        maxlength : 100, 
    }, 
    contactNumber :  {
        type : Number , 
    }

})

module.exports  = mongoose.model("Profile" , profileSchema) ;