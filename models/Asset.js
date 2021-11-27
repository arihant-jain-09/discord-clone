const mongoose=require('mongoose');
const assetSchema=new mongoose.Schema({
  url:String,
})

module.exports=assetSchema;