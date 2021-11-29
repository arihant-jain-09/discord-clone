const mongoose=require('mongoose');
const Message=mongoose.model('messages');
const io=require('../index');
module.exports=(app)=>{
  //get all messages
    app.post('/api/servers/channels/messages',async(req,res)=>{
      const {_id}=req.body;
        try {
          const messages=await Message.find({_channel:_id});
          console.log(messages);
          res.send(messages);
        } catch (error) {
          res.send(error)
        }
    })
  //add message
  app.post('/api/servers/channels/messages/add',async(req,res)=>{
      try {
        const message=new Message({
          sender:{
            _id:req.user.id,
            name:req.user.displayName,
            img:req.user.photo[0].value,
          },
          text:req.body.message,
          _channel:req.body.channel._id
        })
        await message.save().then((response)=>{
          io.emit('message-added', response)
        })
        res.status(200).send(message);
      } catch (error) {
        res.send(error)
      }
  })
}