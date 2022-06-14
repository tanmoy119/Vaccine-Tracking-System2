const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:Number
    },
    message:{
        type:Number
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const Message = new mongoose.model('Message',messageSchema);

module.exports = Message;

