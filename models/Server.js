const mongoose=require('mongoose');
const serverSchema=new mongoose.Schema({
    server_name:String,
    img:String,
    _admin:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    _channels: [{_id: {type:mongoose.Schema.Types.ObjectId},name:String}],
})
mongoose.model('servers',serverSchema);