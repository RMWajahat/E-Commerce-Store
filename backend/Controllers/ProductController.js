const Product = require('../Models/ProductModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/asyncErrors');
const Features = require('../utils/Features');
//             comment:{creating product from model and saving it in database



// create product in database --------- This must be admin access only
const createProduct = catchAsyncErrors(
    async (req, res) => {
        const createProduct = await Product.create(req.body);

        res.status(201).json({
            success: true,
            createProduct: createProduct
        })
    }
);

exports.createProduct = createProduct;




// get method for getting all products from database
const getProducts = catchAsyncErrors(
    async (req, res) => {
        const resultsPerPage = 4;
        let features = new Features(Product.find(), req.query).search().filter().pagination(resultsPerPage);        // yeh line of code hai jo Features.js ka class call kara ga aur uss ka functions call kara ga
        const products = await features.query;
        res.status(200).json({
            success: true,
            products: products,
        })
    }
);

exports.getProducts = getProducts;




// update product in database --------- This must be admin access only

const updateProduct = catchAsyncErrors(
    async (req, res, next) => {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 500));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {    // ye function id ka use kr k product ko find krta hai and then update krta hai
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            updatedProduct: product
        })



    }
);

exports.updateProduct = updateProduct;






// delete product in database --------- This must be admin access only

const DeleteProduct = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }


        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "product deleted successfully"
        })



    }
);

exports.DeleteProduct = DeleteProduct;




// get product details by id


const getProductDetails = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }


        res.status(200).json({
            success: true,
            product: product
        })
    }
);


exports.getProductDetails = getProductDetails;