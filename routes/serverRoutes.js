const mongoose=require('mongoose');
const Server=mongoose.model('servers');
const Message=mongoose.model('messages');
const Channel=mongoose.model('channels');
const io=require('../index');
module.exports=(app)=>{
    app.get('/api/servers',(req,res)=>{
      Server.find({}).then((response)=>{
        res.send(response);
      })
      .catch((err)=>{
        console.log(err);
      })
    })

    app.post('/api/servers/add',async(req,res)=>{
      // console.log(req.body.formData);
      const {server_name,img}=req.body.formData;
      Server.find({server_name:server_name}).then(async(response)=>{
        if(response.length>0){
          res.send({message:'Please choose a different name....'});
        }
        else{
          const server=new Server({
            server_name,
            img,
            _admin:req.user
          })
          const message=new Message({
            sender:{
              img:'https://res.cloudinary.com/dv17tob3g/image/upload/v1638122697/discord-bot_wzk0le.png',
              name:'Server'
            },
            text:`Welcome to ${server_name}`,
            _channel:server.id,
          })
          const channel=new Channel({
            _id:server.id,
            name:'general',
            _message:message.id,
            _server:server.id
          });
          server._channels={_id:server.id,name:"general"};
          await server.save();
          await channel.save();
          await message.save();
          io.emit('server-added',server)
          res.send({message:'server added'});
        }
      })
      
    })
}