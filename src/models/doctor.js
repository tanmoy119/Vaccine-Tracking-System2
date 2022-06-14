const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({

    name:{
        type:String
    },
    type:{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:Number
    }
})

const Doctors = new mongoose.model('Doctor',doctorSchema);

module.exports = Doctors;

