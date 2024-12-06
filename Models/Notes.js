const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
   //to store the user,so that other users cannot see his notes
   user:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'user'
   },
    title:{
       type: String,
       required:true
    },
    description:{
       type: String,
       required:true,
       
    },
    tag:{
       type: String,
       required:true
    },
    date:{
       type: Date,
       default:Date.now
    },
     });
     module.exports = mongoose.model('Notes',NotesSchema);