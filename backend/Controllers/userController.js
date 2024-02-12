const User = require('../Models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/asyncErrors');
const sendTokenResponse = require('../utils/responseWithToken');

const bcrypter = require('bcryptjs');


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


module.exports = {
    registerUser,
    loginUser,
    logoutUser
};