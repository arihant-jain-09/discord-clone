const mongoose=require('mongoose');
const Message=mongoose.model('messages');
module.exports=(app)=>{
  //get all channels with specific server
    app.post('/api/servers/channels/messages',async(req,res)=>{
      const {_id}=req.body;
      console.log(_id);
        try {
          const messages=await Message.find({_id});
          console.log(messages);
          res.send(messages);
        } catch (error) {
          res.send(error)
        }
    })
}