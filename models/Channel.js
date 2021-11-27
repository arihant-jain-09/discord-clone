const message=require('./Message');
const mongoose=require('mongoose');

const channelSchema=new mongoose.Schema({
  name:String,
  messages:[message],
  _server:{type:mongoose.Schema.Types.ObjectId,ref:'Server'},
})

mongoose.model('channels',channelSchema);