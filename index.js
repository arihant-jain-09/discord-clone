const express=require('express');
const http=require('http');
const cors=require('cors');
const socketIO =require('socket.io');
const app=express();
const server = http.createServer(app);
const io = socketIO(server, {
    transports:['polling'],
    cors:{
      cors: {
        origin: "http://localhost:3000"
      }
    }
  })
  io.on('connection', (socket) => {
    console.log('A user is connected');
  
    socket.on('message', (message) => {
      console.log(`message from ${socket.id} : ${message}`);
    })
  
    socket.on('disconnect', () => {
      console.log(`socket ${socket.id} disconnected`);
    })
  })
  module.exports=io;
  app.use(cors());
app.use(express.urlencoded({limit: "30mb",extended:true}))
app.use(express.json({limit: "30mb",extended:true}))
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys = require('./config/keys');
const mongoose=require('mongoose');
require('./models/User');
require('./models/Server');
require('./models/Channel');
require('./models/Message');
require('./services/passport');
app.use(cookieSession({
    age:1000 * 60 * 60 * 24,
    keys:['dfevvieiciecjejje']
}))
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{console.log('connected to mongodb');})
require('./routes/authRoutes')(app);
require('./routes/serverRoutes')(app);
require('./routes/channelRoutes')(app);
require('./routes/messageRoutes')(app);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    const path=require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
const PORT=process.env.PORT || 5000
server.listen(PORT);