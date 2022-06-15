const express = require('express');
const doctorRouter = express.Router();

const bodyParser = require('body-parser');
const axios = require('axios');

doctorRouter.use(express.json());






doctorRouter.get("/add/appointment", async (req, res)=>{
    try {
        // const email = req.query.email;
        //  const data = await axios.get(`https://ap-south-1.aws.data.mongodb-api.com/app/application-0-btquy/endpoint/get/doctor?secret=tanmoy`)
        // console.log(data);
       
        res.render('adap');
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})
doctorRouter.post("/add/appointment", async (req, res)=>{
    try {
        const email = req.query.email;
        console.log(email);
        const request = await axios.get(`https://ap-south-1.aws.data.mongodb-api.com/app/application-0-btquy/endpoint/get/users?secret=tanmoy&email=${email}`)
        let data = request.data;
        const userdata = data[0];
        console.log(userdata);
        const sdata= await axios({
            method: 'post',
            url: `https://ap-south-1.aws.data.mongodb-api.com/app/application-0-btquy/endpoint/add/appointment?secret=tanmoy`,
            headers: {}, 
            data: {
              userid:userdata._id,
              doctorid:req.body.doctorid,
              time:req.body.time,
              location: req.body.location
            }
          });
       
        res.redirect(`/?name=${userdata.name}&email=${userdata.email}&type=${userdata.type}`);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

doctorRouter.get("/appointments", async (req, res)=>{
    try {
        // const email = req.query.email;
        //  const data = await axios.get(`https://ap-south-1.aws.data.mongodb-api.com/app/application-0-btquy/endpoint/get/doctor?secret=tanmoy`)
        // console.log(data);
       
        res.render('addapoinment');
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

module.exports = doctorRouter;