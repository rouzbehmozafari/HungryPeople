const dotenv = require('dotenv').config()
const express = require('express')
const formidable = require('formidable')
const mailSender = require('./helper/mailSender')

const app = express()
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})
app.get('/test',(req,res)=>{
    res.send('hello')
})
app.post('/sent',(req,res)=>{
    const form = formidable()
    form.parse(req,(err,fields,_)=>{
        if(err){
            console.log(err)
            res.send({status:'error',err})
        }
        else{
            const newMessage = {
                to: fields.email,
                subject : `We will be in touch ${fields.name} !`,
                message : 
                    `Hi ${fields.name}!
                    We have recieved your Message.
                    as soon as possible, we will contact you!`
            }
            mailSender(newMessage)
        }
    })
    res.redirect('/sent')
})
app.post('/bookSent',(req,res)=>{
    const form = formidable()
    form.parse(req,(err,fields,_)=>{
        if(err){
            console.log(err)
            res.send({status:'error',err})
        }
        else{
            const newMessage = {
                to: fields.email,
                subject : `Table is Booked ${fields.name} !`,
                message : 
                    `Hi ${fields.name}!
                    Booking Infos:
                    Name:${fields.name}
                    Number of People:${fields.people}
                    Date:${fields.date}
                    Time:${fields.time}
                    `
            }
            mailSender(newMessage)
        }
    })
    res.redirect('/sent')
})
app.use((req,res)=>{
    res.redirect('/404')
})
const PORT = 5000
app.listen(PORT,()=>{
    console.log('listening on: ',PORT)
})