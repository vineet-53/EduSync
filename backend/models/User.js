const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  firstName : { 
    type : String , 
    required : true,
  },
  lastName : { 
    type : String , 
    required : true,
  },

  email: {
    type: String,
    required: true,
  },

  contactNumber : { 
    type : Number , 
  }, 

  password: {
    type: String,
    required: true,
  },

  active : { 
    type : Boolean,
    default : false
  },
  image :  { 
    type : String , 

  }, 
  courses :  [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Course'
  }],

  profile : { 
    type : mongoose.Schema.Types.ObjectId, 
    ref : "Profile"
  }, 

  courseProgress : { 
    type : mongoose.Schema.Types.ObjectId, 
    ref : "CourseProgress" , 
  }, 
  token : { 
    type :String, 
  }, 
  resetPasswordExpires :{ 
    type :Number, 
  },
  accountType: {
    type: String,
    enum: ["Instructor", "Student", "Admin"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
