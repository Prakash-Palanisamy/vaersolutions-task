const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./userRouter');
const morgan =require('morgan');
const cors = require('cors');

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api', userRouter)


app.use('/',(req,res) => {
    res.send(" welcome");
})

app.listen(5000, ()=> {
    console.log("localhost connected Successfully");
})

mongoose.connect('mongodb://localhost:27017/vaer-task', { useNewUrlParser: true , useUnifiedTopology: true }, () =>
{
    console.log("Sever connected");
})