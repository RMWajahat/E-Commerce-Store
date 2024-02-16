const Order = require('../Models/ordersModel');
const catchAsyncErrors = require("../Middleware/asyncErrors");
const ErrorHandler = require("../Utils/errorHandler");


const createOrder = catchAsyncErrors(
    async (req, res, next) => {
        const {
            Shippinginfo,
            orderItems,
            paymentinfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

        const NewOrder = await Order.create(
            {
                Shippinginfo,
                orderItems,
                paymentinfo,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                user: req.user._id
            }
        )
        if (!NewOrder) {
            return next(new ErrorHandler('Order not created', 404))
        }
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
        })
    })


// get order details - all orders for a Admin

const getAllOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orders = await Order.find();
        if (!orders) {
            return next(new ErrorHandler('No orders found', 404))
        }
        res.status(200).json({
            success: true,
            Orders: orders
        })
    }
)


// get order details - one order for a user

const getSingleOrder = catchAsyncErrors(
    async (req, res, next) => {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new ErrorHandler(`Requested order can't be found`, 404))
        }
        res.status(200).json({
            success: true,
            Order: order
        })
    }
)



module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder
}