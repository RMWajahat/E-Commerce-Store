const User = require('../Models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/asyncErrors');
const sendTokenResponse = require('../utils/responseWithToken');

const bcrypter = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');


const registerUser = catchAsyncErrors(
    async (req, res, next) => {
        const { name, email, password, role, createdAt } = req.body;

        if (!name || !email || !password) {
            return next(new ErrorHandler("Please fill all the fields", 400));
        }


        const Is_user_exist = await User.findOne({ email });
        if (Is_user_exist) {
            return next(new ErrorHandler("User already exists", 400));
        }
        const usernew = await User.create({
            name, email, password, avatar: {
                public_id: "Some public id will be here from cloudinary",
                url: "random url"

            }, role, createdAt
        }
        );

        // console.log("User created successfully");

        sendTokenResponse(usernew, 201, "User Registered successfully", res);


    })




const loginUser = catchAsyncErrors(
    async (req, res, next) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        }
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const user_password_hashed = await User.findOne({ email }).select("+password");     // this return the object with password selected 

        const is_validUser = await bcrypter.compare(password, user_password_hashed.password);
        if (is_validUser) {
            sendTokenResponse(existingUser, 200, "User Logged in successfully", res);
        }

        return next(new ErrorHandler("Un-Authorized Access", 401));

    }
)



const logoutUser = catchAsyncErrors(
    async (req, res, next) => {

        const { token } = req.cookies;
        if (!token) {
            return next(new ErrorHandler("No user is logged in", 400));
        }

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            message: "User Logged out successfully"
        })
    }
)

const forgetPassword = catchAsyncErrors(
    async (req, res, next) => {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new ErrorHandler("User not found with this email", 404));
        }
        const resetToken = user.GenerateResetPasswordToken();

        await user.save({ validateBeforeSave: false });
        const resetLink = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const email_message = `Follow link to reset your password. \n\n${resetLink}\n\nIf you have not requested this email then please ignore it`;
        try {
            
            await sendEmail({
                email: user.email,
                subject: "Ecommerce Password Recovery",
                message: email_message
            });
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully. Please check your email`
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler("Email could not be sent", 500));

        }
    }
)





module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgetPassword
};