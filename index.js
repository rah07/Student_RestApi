const express=require("express");
const port=7000;
const app=express();

const db= require("./config/mongoose")
const student=require('./model/student')

app.use(express.json());

app.get("/",(req,res)=>{

    res.send("hello world");
    })


app.post("/student",async (req,res)=>{

            try{
            console.log(req.body)
            const user= new student(req.body)
            const Createuser=await user.save()
                res.status(201).send(Createuser)
            }

            catch (err) {
                res.status(400).send(err)
        
            }
        
    })

    // read the data from reegistred student

    app.get('/student',async (req,res)=>{

        try {

            const studentsData= await student.find();
            res.send(studentsData);
            
        } catch (error) {

            res.send(error)
            
        }



    })
// get the individual student data using id

app.get("/student/:id",async (req,res)=>{

    try {

        const _id = req.params.id;
        const studentdata=await student.findById({_id})
        res.send(studentdata);
    if(!studentdata){
        return res.status(404).send();
    }
    else{
        res.send(studentdata)
    }
    
} 

    catch (error) {
        res.send(error)
    }

})


// update the student by it id

app.patch("/student/:id", async(req,res)=>{

        try {
            const _id= req.params.id;
            const updateStudents= await student.findByIdAndUpdate(_id,req.body,{
            new:true
            })
            res.send(updateStudents)            
        } 
        catch (error) {
            res.send(error)
        }

})


// delete student by its id


app.delete('/student/:id',async(req,res)=>{

    try {
        const _id= req.params.id;
        const deleteStudents= await student.findByIdAndDelete(_id)

        if(!req.params.id){

            return res.status(400).send()

        }

        res.send(deleteStudents)
        
    } catch (error) {        
        res.status(500).send(error)
    }
})





app.listen(port,function(err){

    if(err){


        console.log(`error occur on express server ${port}`);
    }

    console.log("server sucessfully run");


})
