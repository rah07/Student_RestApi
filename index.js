const express=require("express");
const port=7000;
const app=express();

const db= require("./config/mongoose")
const student=require('./model/student')

app.use(express.json());

app.get("/",(req,res)=>{

    res.send("hello world");
    })


app.post("/student",(req,res)=>{

    console.log(req.body)
    const user=student(req.body)
    user.save().then(()=>{

        res.status(201).send(user)
    }).catch((err)=>{
        // console.log(`Error while creating student detail : ${err}`);
    res.status(400).send(err)
    })



// res.send("hello small world");
})

app.listen(port,function(err){

    if(err){


        console.log(`error occur on express server ${port}`);
    }

    console.log("server sucessfully run");


})
