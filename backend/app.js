// app ka andr app yani ka express aka code rakhna ha 
const express = require('express');

const ErrorMiddleWare = require('./middleware/error');

// importing product router   // router ko import kia hai
// -------------------------------------------------------
const productRoutesAll = require("./Routes/ProductsRoutes");  // router ko import kia hai


// initaializing usages 
const app = express();
app.use(express.json());    // yani ka app express ka use kara ga or json ka use kara ga

// -------------------------------------------------------      Yahan scene ye ha k saray routes unka name ka bna ka phir unko app.use ma use kara ga   iss tra code app.js ma kmm ho jae ga 
// Now using product router in app.js     calling api
app.use("/api/ecommercev1",productRoutesAll)



// -------------------------------------------------------
// Error Handler Middleware
app.use(ErrorMiddleWare);


// Path: backend/app.js


// export kaein ga app ko 
module.exports = app;