const mongoose=require('mongoose');
const Channel=mongoose.model('channels');
module.exports=(app)=>{
  //get all channels with specific server
    app.post('/api/servers/channels',async(req,res)=>{
      const {_channels}=req.body;
      console.log(_channels);
      _channels.map(async(channel)=>{
        try {
          const channels=await Channel.find({_id:channel._id});
          res.send(channels);
        } catch (error) {
          res.send(error)
        }
      })
    })
}