const mongoose=require('mongoose');
const Server=mongoose.model('servers');
module.exports=(app)=>{
    app.get('/api/servers',()=>{
      Server.find().then((response)=>{
        res.send(response);
      })
      .catch((err)=>{
        console.log(err);
      })
    })

    app.post('/api/servers',()=>{
      console.log(req.body);
      const server={
        name,
        photo,
        _admin:req.user
      }
      
    })
}