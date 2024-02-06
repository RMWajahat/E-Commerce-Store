const User = require('../Models/userModel');
const generateTokenFromid = require('../utils/generateToken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/asyncErrors');


const registerUser = catchAsyncErrors(
    async (req, res, next) => {
        const { name, email, password, role, createdAt } = req.body;

        if (!name || !email || !password || !role || !createdAt) {
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



module.exports = registerUser;