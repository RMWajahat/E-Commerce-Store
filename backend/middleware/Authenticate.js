const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./asyncErrors");

const AuthenticateUser = catchAsyncErrors(async (req, res, next) => {
    const token = await req.cookies.token;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    next();
});

module.exports = AuthenticateUser;