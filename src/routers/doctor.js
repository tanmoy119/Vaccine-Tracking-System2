const express = require('express');
const doctorRouter = express.Router();
const doctor = require('../models/doctor');
const bodyParser = require('body-parser');

doctorRouter.use(express.json());
doctorRouter.use(bodyParser.json());



doctorRouter.get('/doctor', async (req, res)=>{
    try {

        const data = await doctor.find({});
        res.send(data);
    } catch (err) {
        // res.status(401).send(err);
        console.log(err);
    }
})

doctorRouter.post("/doctor", async (req, res)=>{
    try {
        console.log(req.body);

        const addData = new doctor({
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            type:req.body.type,
        
        });
        console.log(addData);
        const saveData = await addData.save();
        res.send(saveData);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

module.exports = doctorRouter;