const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
   firstName : String,
   lastName : String,
   username : String,
   email : String, 
   password : String, 
   joined : {type: Date, default: Date.now()},
   bookIssueInfo : [{
      book_info : {
         id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Issue",
         }, 
      },
   }],
   gender : String,
   address : String,
   image : String,
   violationFlag : {type : Boolean, default : false},
   fines : {type : Number, default: 0},
   isAdmin : {type : Boolean, default : false},
});

userSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model("User", userSchema);