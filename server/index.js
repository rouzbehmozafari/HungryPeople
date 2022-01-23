const express = require('express')

const app = express()
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})
app.get('/test',(req,res)=>{
    res.send('hello')
})
const PORT = 5000
app.listen(PORT,()=>{
    console.log('listening on: ',PORT)
})