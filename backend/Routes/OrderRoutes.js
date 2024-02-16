const express = require('express');
const orderRouter = express.Router();

const { createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    getMyOrders
} = require('../Controllers/OrderController');

const { AuthenticateUser, isUserAdmin } = require("../middleware/Authenticate");

orderRouter.route("/order/create").post(AuthenticateUser, createOrder);
orderRouter.route("/order/orders").get(AuthenticateUser, isUserAdmin('admin'), getAllOrders);
orderRouter.route("/order/:id").get(AuthenticateUser, isUserAdmin('admin'), getSingleOrder);
orderRouter.route("/order/orders/me").get(AuthenticateUser, getMyOrders);




module.exports = orderRouter;