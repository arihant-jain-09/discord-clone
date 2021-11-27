const express=require('express');
const app = express()
app.use(express.urlencoded({limit: "30mb",extended:true}))
app.use(express.json({limit: "30mb",extended:true}))

app.get('/', (req,res)=>{
   res.send('Hello');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
})