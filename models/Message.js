const mongoose=require('mongoose');
const asset=require('./Asset');
const messageSchema=new mongoose.Schema({
  sender:{type:mongoose.Schema.Types.ObjectId},
  text:String,
  assets:[asset],
  _channel:{type:mongoose.Schema.Types.ObjectId,ref:'Channel'},
})

mongoose.model('messages',messageSchema);