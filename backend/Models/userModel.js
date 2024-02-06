const mongoose = require('mongoose');
const bycrypter = require('bcryptjs');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "Please enter your name"],
        minLength: [4, "Name must be at least 4 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false,        // yeh confirm kara ga k data fetch ka doraan password show nahi ho --- security purpose
    },
    avatar: {    // yeh image ka url save kara ga   
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,         // yeh token save kara ga jab user password reset kara ga to uss token ko save kara ga 
    resetPasswordExpire: Date,          // yeh token ki expiry date save kara ga so that user ko pata chalay k token expire ho gaya hai ya nahi
});

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        // yeh check kara ga k agar password change hua hai to hash kara ga

        next();
    }

    this.password = await bycrypter.hash(this.password, 10);      // yeh password ko hash kara ga
})



module.exports = mongoose.model('User', userSchema);  // yeh model ko export kara ga jis ko hum use kara ga
// just to make sure every entity should contains same structure of data so that we can use it in our application