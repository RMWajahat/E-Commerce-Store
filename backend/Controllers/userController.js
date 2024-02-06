const User = require('../Models/userModel');
const generateTokenFromid = require('../utils/generateToken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/asyncErrors');

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

        const token_for_user = generateTokenFromid(usernew._id);
        res.cookie('token', token_for_user, {
            withCredentials: true,
            httpOnly: false
        });


        // console.log("cookie set successfully");


        res.status(200).json({
            message: "User created successfully",
            success: true,
        });


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

        const user_password_hashed = await User.findOne({ email }).select("password");     // this return the object with password selected 

        const is_validUser = await bcrypter.compare(password, user_password_hashed.password);
        if (is_validUser) {
            const token_for_user = generateTokenFromid(existingUser._id);
            res.cookie('token', token_for_user, {
                withCredentials: true,
                httpOnly: false
            });
            return res.status(201).json({
                success: true,
                message: "User logged in successfully"
            })
        }

        return next(new ErrorHandler("Access Denied", 401));

    }
)


module.exports = {
    registerUser,
    loginUser
};