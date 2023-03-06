const connectToMongo = require('./db');
const express = require('express')
const router = express.Router();
const uploadToIpfs = require('./upload');

var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

app.use(cors())
app.use(express.json())

// Available Routes
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))
app.get('/', async (req,res)=> {
  res.send("Hello world, this is HealthcareDApp")
})

app.post('/uploadfile',async (req,res)=>{
  const json = req.body;
  const result = await uploadToIpfs(json);
  res.send(result) 
})


app.listen(port, () => {
  console.log(`HealthcareDApp backend listening at http://localhost:${port}`)
})

