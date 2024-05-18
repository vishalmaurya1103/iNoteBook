const connectMongo = require ('./db')
const express = require('express')
var cors = require('cors')

connectMongo();
const app = express()
const port = 50000

app.use(cors())
app.use(express.json())
app.use('/api/auth/',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port ,()=>{
    console.log(`Server is Running at http://localhost:${port}`)
})