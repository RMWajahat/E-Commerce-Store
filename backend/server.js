// Desc: main file of backend
// Date: 5/30/2021


// dealing with uncaught exceptions   like I console.log(youtube ) which is not defined then it will give error and shut down the server     bejti hona sa bachh jae gi 

process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
});



// console.log(loho);      this will crash server and will not run the server further   so we will use uncaughtException to handle this error   above is the thing happened

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




const server = app.listen(process.env.PORT,()=>{    // process.env.VARIABLES in env file are accessed.
    console.log(`Server started on port ${process.env.PORT}`);
});



// -------------------------------------------------------
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1);
    });
});