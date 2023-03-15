const connectToMongo = require('./db');
const express = require('express');
const router = express.Router();
const {uploadToIpfs, init} = require('./upload');
init()

var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth/user', require('./routes/userAuth'))
app.use('/api/auth/doctor', require('./routes/doctorAuth'))
// app.use('/api/notes', require('./routes/notes'))
app.post('/uploadfile',async (req,res)=>{
  const json = req.body;
  const result = await uploadToIpfs(json,"myFile2");
  res.send(result) 
})


app.get('/', async (req,res)=> {
  res.send("Hello world, this is HealthcareDApp")
})




app.listen(port, () => {
  console.log(`HealthcareDApp backend listening at http://localhost:${port}`)
})

