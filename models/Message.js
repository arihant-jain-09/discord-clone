const mongoose=require('mongoose');
const asset=require('./Asset');
const messageSchema=new mongoose.Schema({
  sender:{
    _id:{type:mongoose.Schema.Types.ObjectId},
    name:String,
    img:String
  },
  text:String,
  assets:[asset],
  edited:false,
  _channel:{type:mongoose.Schema.Types.ObjectId,ref:'Channel'},
},{timestamps: true})

mongoose.model('messages',messageSchema);