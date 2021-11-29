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

  //edit message
  app.post('/api/servers/channels/messages/edit',async(req,res)=>{
    try {
      Message.updateOne({_id:req.body.message._id},{...req.body.message,edited:true}).then((response)=>{
        if(response.modifiedCount==1){
          io.emit('message-updated',{...req.body.message,edited:true})
          res.status(200).send({message:'msg edited'});
        }
        else res.status(400).send({message:'failed to edit'});
      })
    } catch (error) {
      res.status(500).send(error);
    }
    
})
  //delete message
  app.post('/api/servers/channels/messages/delete',async(req,res)=>{
    const {_id}=req.body;
    try {
      Message.deleteOne({_id}).then((response)=>{
        if(response.deletedCount==1){
          io.emit('message-deleted',{_id})
          res.status(200).send({message:'msg deleted'});
        }
        else res.status(400).send({message:'failed to delete'});
      })
    } catch (error) {
      res.status(500).send(error);
    }
  })

  app.post('/api/servers/channels/messages/pin',async(req,res)=>{
    console.log(req.body);
    const {msg_Id,channel_Id}=req.body;
    try {
      const message=new Message({
        sender:{
          _id:req.user.id,
          img:'https://res.cloudinary.com/dv17tob3g/image/upload/v1638210021/1f57f1c100434d1ff6569a495ada213e_bvrgeg.svg'
        },
        text: `${req.user.displayName} pinned a message to this channel.`,
        pinned: msg_Id,
        _channel:channel_Id,
      });
      await message.save().then((response)=>{
        console.log(response);
        io.emit('message-added', response)
      })
      res.status(200).send(message);
    } catch (error) {
      res.status(500).send(error);
    }
  })
}