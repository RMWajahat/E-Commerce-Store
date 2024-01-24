// Desc: main file of backend
// Date: 5/30/2021

// -------------------------------------------------------
// importing modules to use in this file
const app = require('./app');
const dotenv = require('dotenv');   // dotenv ka use env values ko use krna ka lia kia hai
const connectDatabase = require('./database/databaseConnection');    // databaseConnection.js ko import kia hai


// -------------------------------------------------------
// initializations of Usages 
dotenv.config({path:'./backend/config/config.env'});    // yahan btaya ka env wala kahan hain


// -------------------------------------------------------
// Connecting to Data Base
connectDatabase();    // yahan connectDatabase function ko call kia hai




app.listen(process.env.PORT,()=>{    // process.env.VARIABLES in env file are accessed.
    console.log(`Server started on port ${process.env.PORT}`);
});