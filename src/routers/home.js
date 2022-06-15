const express = require('express');
const homeRouter = express.Router();
const message = require('../models/message');
const bodyParser = require('body-parser');
const axios = require('axios');

homeRouter.use(express.json());
//homeRouter.use(bodyParser.json());



homeRouter.get('/', async (req, res)=>{
    try {
            const name = req.query.name;
            const email = req.query.email;
            const type1 = req.query.type;
            let type;
            let type2
            if (type1=="patient") {
                type='patient';
                
            }else if (type1=='doctor'){
                type2='doctor';
            }
            
           //console.log(`home-${name}`);
        res.render('index',{
            name:name,
            email:email,
            type:type,
            type2:type2
        });
    } catch (err) {
        // res.status(401).send(err);
        console.log(err);
    }
})

homeRouter.post("/", async (req, res)=>{
    try {
        console.log(req.body);

        const addData = new message({
            name:req.body.name,
            email:req.body.email,
            number:req.body.number,
            message:req.body.message,
        
        });
        console.log(addData);
        const saveData = await addData.save();
        res.render('index');
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})
homeRouter.get('/Vaccine-Tracker', async (req, res)=>{
    try {

        res.render('vaccine');
    } catch (err) {
        // res.status(401).send(err);
        console.log(err);
    }
})
homeRouter.get('/get/appointment', async (req, res)=>{
    try {

        res.render('vaccine');
    } catch (err) {
        // res.status(401).send(err);
        console.log(err);
    }
})
homeRouter.get('/signup', async (req, res)=>{
    try {
        const email = req.query.email;
        const name = req.query.name;

        res.render("signup",{
            email:email,
            name:name
        });
    } catch (err) {
        // res.status(401).send(err);
        console.log(err);
    }
})

homeRouter.post('/signup', async (req, res)=>{
    try {
      const name = req.body.name;
      const email= req.body.email;
      const type = req.body.type;
      console.log(`post-${req.body.name}`);
           const sdata= await axios({
                method: 'post',
                url: `https://ap-south-1.aws.data.mongodb-api.com/app/application-0-btquy/endpoint/add/user?secret=tanmoy`,
                headers: {}, 
                data: {
                  name: req.body.name,
                  email: req.body.email,
                  type: req.body.type,
                  gender: req.body.gender
                }
              });

        res.redirect(`/?name=${name}&email=${email}&type=${type}`);
    } catch (err) {
        // res.status(401).send(err);
        console.log(err);
    }
})

module.exports = homeRouter;