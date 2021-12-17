const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({

    name:{

        type:String,
        required:true,
    
    },
    admissionnumber:{
        type:Number,
        required:true,
        unique:true
    },
    class:{
        type:String,
        require:true
    },

},{

    timestamps:true
})

const Student=mongoose.model("Student",studentSchema)

module.exports=Student