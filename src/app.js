const express = require('express');
const app = express();


app.use(express.json());
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json())
//Require Routers...
const homeRouter = require('./routers/home');
const doctorRouter = require('./routers/doctor');
//Require Models..
const message = require('./models/message');
//Require bodyParser..
//const bodyParser = require('body-parser');


//DB connection...
require('./db/conn');


//require PATH
const path = require('path');
//require HBS
const hbs = require("hbs");


//app.use(bodyParser.json());


//Port initializing..

const port = process.env.PORT || 3000;

//Define Paths,..
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

//Set static path..
app.use(express.static(static_path));

//Set hbs..
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

//Routers..
app.use(homeRouter);
app.use(doctorRouter);


//listen..
app.listen(port, ()=>{
    console.log(`server listen at port${port}`);
})