const connectToMongo = require('./db');
const express = require('express');
const router = express.Router();
const {uploadToIpfs, init} = require('./upload');
require('dotenv').config();

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
app.use('/api/auth/pharmacist', require('./routes/pharmacistAuth'))
app.use('/api/prescription/doctor', require('./routes/prescription'))
app.use('/api/appointment/user', require('./routes/appointment'))
app.post('/uploadfile',async (req,res)=>{
  const json = req.body;
  const result = await uploadToIpfs(json,req.body.filename);
  res.send(result) 
})


app.get('/', async (req,res)=> {
  res.send("Hello world, this is HealthcareDApp")
})




app.listen(port, () => {
  console.log(`HealthcareDApp backend listening at http://localhost:${port}`)
})

