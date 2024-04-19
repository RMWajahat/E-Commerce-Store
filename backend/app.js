// app ka andr app yani ka express aka code rakhna ha 
const express = require('express');
const cookieParser = require('cookie-parser');
const crossOriginSharing = require('cors');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const ErrorMiddleWare = require('./middleware/error');

// importing product router   // router ko import kia hai
// -------------------------------------------------------
const productRoutesAll = require("./Routes/ProductsRoutes");  // router ko import kia hai
const user_routes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const contactRoutes = require("./Routes/ContactRoutes");




const app = express();
app.use(express.json());    // yani ka app express ka use kara ga or json ka use kara ga
app.use(bodyParser.urlencoded({ extended: true }));    // body parser ka use kara ga or urlencoded ka use kara ga    extended: true ka mtlb hai ka koi bhi data jo a raha hai wo parse ho jae ga
// aur use krna ki waja yeh hai k bodyparser hamein help kara ga in

// initaializing usages 

// cookie parser usage 
app.use(cookieParser()); // cookie parser ka use kara ga
// this is used to parse the cookies from the request headers and make them available in req.cookies

// cors usage
app.use(crossOriginSharing({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


// -------------------------------------------------------      Yahan scene ye ha k saray routes unka name ka bna ka phir unko app.use ma use kara ga   iss tra code app.js ma kmm ho jae ga 
// Now using product router in app.js     calling api
app.use("/api/ecommercev1", productRoutesAll)
app.use("/api/ecommercev1", orderRoutes)
app.use("/api/ecommercev1", contactRoutes)
app.use("/auth", user_routes)




// -------------------------------------------------------
// Error Handler Middleware
app.use(ErrorMiddleWare);


// Path: backend/app.js


// export kaein ga app ko 
module.exports = app;