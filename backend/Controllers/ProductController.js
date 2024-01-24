const Product = require('../Models/ProductModel');
//             comment:{creating product from model and saving it in database



// create product in database --------- This must be admin access only
const createProduct = async (req, res) => {
    const createProduct = await Product.create(req.body);

    res.status(201).json({
        success: true,
        createProduct: createProduct
    })
}

exports.createProduct = createProduct;




// get method for getting all products from database
const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products: products,
    })
}

exports.getProducts = getProducts;




// update product in database --------- This must be admin access only

const updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
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

exports.updateProduct = updateProduct;






// delete product in database --------- This must be admin access only

const DeleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })



}

exports.DeleteProduct = DeleteProduct;




// get product details by id


const getProductDetails = async (req, res) => {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }


        res.status(200).json({
            success: true,
            product: product
        })
}


exports.getProductDetails = getProductDetails;