const catchAsyncErrors = require('../middleware/asyncErrors');
const Stripe = require("stripe")
const stripe = Stripe("sk_test_51PKQQpP6Zjk0zujrczNepVQPAHsO5BAzsBReBTOxQ9jsqBL1Ws4njeqEWlbuviKpxzaNi1lf47JAYSERX9w14qXf006jFDN9rm");


const Makepayment = catchAsyncErrors(async (req, res, next) => {


    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount * 100,
        currency: "usd",
        metadata: {
            company: "GNES",
        }
    })

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    });
});



const getStripeKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        stripePublishableKey: process.env.STRIPE_PUBLISHER_KEY,
    });
});


module.exports = { Makepayment, getStripeKey };