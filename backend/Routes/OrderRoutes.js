const express = require('express');
const orderRouter = express.Router();

const { createOrder,
    getAllOrders,
    getSingleOrder
} = require('../Controllers/OrderController');

const { AuthenticateUser, isUserAdmin } = require("../middleware/Authenticate");

orderRouter.route("/order/create").post(AuthenticateUser, createOrder);
orderRouter.route("/order/orders").get(AuthenticateUser, isUserAdmin('admin'), getAllOrders);
orderRouter.route("/order/:id").get(AuthenticateUser, isUserAdmin('admin'), getSingleOrder);




module.exports = orderRouter;