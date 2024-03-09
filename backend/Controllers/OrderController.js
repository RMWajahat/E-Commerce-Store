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
            return next(new ErrorHandler('No orders found', 404));
        }
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += Number(order.totalPrice)
        })
        res.status(200).json({
            success: true,
            total: totalAmount,
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
            orders: order
        })
    }
)

// get order details - all users orders for a user
const getMyOrders = catchAsyncErrors(
    async (req, res, next) => {
        const orderlist = await Order.find({ user: req.user._id });

        if (!orderlist) {
            return next(new ErrorHandler(`Your have an empty cart.`, 404));
        }
        res.status(200).json({
            success: true,
            OrderList: orderlist
        })
    }
)

// update order details - one order for a user
const updateOrderStatus = catchAsyncErrors(
    async (req, res, next) => {
        const existingOrder = await Order.findById(req.params.id);
        if (!existingOrder) {
            return next(new ErrorHandler(`Requested order can't be found`, 404))
        }
        const { orderStatus } = req.body;
        if (existingOrder.orderStatus === "Delivered") {
            return next(new ErrorHandler(`Order has been delivered already`, 400))
        }

        existingOrder.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.qty);
        })
        existingOrder.orderStatus = req.body.orderStatus;
        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
        })
    }
)


async function updateStock(id, qty) {
    const product = await Product.findById(id);
    product.stock = product.stock - qty;
    await product.save({ validateBeforeSave: false });
}





// delete order - only for admin
const delete_Order = catchAsyncErrors(
    async (req, res, next) => {
        const order = await Order.findById(req.params.orderid);
        if (!order) {
            return next(new ErrorHandler(`Requested order can't be found`, 404))
        }
        await order.remove();
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
        })
    }
)



module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    getMyOrders,
    delete_Order
}