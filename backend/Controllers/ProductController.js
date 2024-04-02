const Product = require('../Models/ProductModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/asyncErrors');
const Features = require('../utils/Features');




//             comment:{creating product from model and saving it in database
// create product in database --------- This must be admin access only
const createProduct = catchAsyncErrors(
    async (req, res, next) => {

        req.body.creator = req.user.id;

        const createProduct = await Product.create(req.body);

        res.status(201).json({
            success: true,
            createProduct: createProduct
        })
    }
);






// get method for getting all products from database
const getProducts = catchAsyncErrors(
    async (req, res) => {
        const resultsPerPage = 8;

        // Product.find().populate("creator")                           we can also use this ----- this will replace user id with the whole user object whie fetching                                       mtlb product response ka sath user ka kala chitta khol ka samna bhaj de ga  
        const productsCount = await Product.countDocuments();  // yeh line of code hai jo database se count kr k products ki total count nikal raha hai
        let features = new Features(Product.find(), req.query).search().filter().pagination(resultsPerPage);         // yeh line of code hai jo Features.js ka class call kara ga aur uss ka functions call kara ga
        const products = await features.query;
        res.status(200).json({
            success: true,
            products: products,
            productsCount: productsCount,
            resultsPerPage: resultsPerPage
        })
    }
);





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


// review Product 

const reviewProduct = catchAsyncErrors(
    async (req, res, next) => {
        const { rating, comment, productId } = req.body;
        const newReview = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }
        let existing_product = await Product.findById(productId);
        if (!existing_product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        let isReviewed = existing_product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
            // review.user q k review ka user id aik object id hai aur req.user._id aik string hai to hm ne dono ko string me convert kr k compare kia hai
        );
        if (isReviewed) {
            existing_product.reviews.forEach(review => {
                if (review.user.toString() === req.user._id.toString()) {
                    review.comment = comment;
                    review.rating = rating;
                }
            });
        } else {
            existing_product.reviews.push(newReview);
            existing_product.numberOfReviews = existing_product.reviews.length;
        }
        let avg = 0;
        // taking rating average 
        existing_product.reviews.map((item) => (avg += item.rating))
        existing_product.ratings = avg / existing_product.reviews.length;
        // yeh line of code hai jo rating ka average nikal raha hai
        await existing_product.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
            message: "Review added successfully"
        })

    })


// get all product reviews
const getAllProductReviews = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.query.productid);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    })

// delete product reveiw by id
const deleteReview = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.query.productid);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        const reviews = product.reviews.filter(review => review._id.toString() !== req.query.reviewid.toString());
        if (JSON.stringify(reviews) === JSON.stringify(product.reviews)) {
            return next(new ErrorHandler("Review not found", 404));
        }
        let avg = 0;
        // taking rating average
        reviews.map((item) => (avg += item.rating))
        product.ratings = avg / reviews.length;

        product.reviews = reviews;
        product.numberOfReviews = reviews.length;
        await product.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        })
    }
)




module.exports = {
    DeleteProduct,
    getProductDetails,
    updateProduct,
    getProducts,
    createProduct,
    reviewProduct,
    getAllProductReviews,
    deleteReview
}