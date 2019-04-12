const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
   book_info : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'Book', 
       },
       title : String,
       author : String,
       ISBN : String,
       category : String,
       stock : Number,
       issueDate : {type : Date, default : Date.now()},
       returnDate : {type : Date, default : Date.now() + 7*24*60*60*1000},
       isRenewed : {type : Boolean, default : false},
   }, 
   
   user_id : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'User',
       },
       
       username : String,
   },
});


module.exports = mongoose.model("Issue", issueSchema);