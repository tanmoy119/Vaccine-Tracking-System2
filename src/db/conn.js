const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/covidindia').then(()=>{
    console.log("connection successfull..");
}).catch(()=>{
    console.log(err);
    console.log("no connection");
})