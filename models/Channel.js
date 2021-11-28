const message=require('./Message');
const mongoose=require('mongoose');

const channelSchema=new mongoose.Schema({
  _id: {
    type:mongoose.Schema.Types.ObjectId
  },
  name:String,
  _message:{type:mongoose.Schema.Types.ObjectId,ref:'Message'},
  _server:{type:mongoose.Schema.Types.ObjectId,ref:'Server'},
})

mongoose.model('channels',channelSchema);