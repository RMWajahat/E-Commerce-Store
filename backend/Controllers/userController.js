const User = require('../Models/userModel');
const generateTokenFromid = require('../utils/generateToken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/asyncErrors');


const registerUser = catchAsyncErrors(
    async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return new ErrorHandler("Please enter all fields", 400);
        }
        const usernew = await User.create({
            name, email, password, createdAt, avatar: {
                public_id: "Some public id will be here from cloudinary",
                url: "random url"

            }
        }, (err, user) => {
            if (err) {
                return new ErrorHandler(err.message, 400);
            }
            return res.status(200).json({
                success: true,
                message: "User Created Succesfully",
            })
        });

        const token_for_user = generateTokenFromid(usernew._id);
        res.cookie('token', token_for_user, {
            withCredentials: true,
            httpOnly: false
        });


        res.status(200).json({
            message: "User created successfully",
            success: true,
        });


    })



module.exports = { registerUser };