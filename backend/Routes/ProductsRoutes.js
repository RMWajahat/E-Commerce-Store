// importing modules to use in this file
const express = require("express");
const { getProducts, createProduct, updateProduct, DeleteProduct, getProductDetails } = require("../Controllers/ProductController");
const AuthenticateUser = require("../middleware/Authenticate");

// -------------------------------------------------------
// Router Creation 
const router = express.Router();  // router ka object bana lia    ab routes bna skta hain

router.route("/products").get(AuthenticateUser, getProducts);  // router.route("/api/ecommercev1/products").get(getProducts);  // router ka object bana lia    ab routes bna skta hain

router.route("/products/new").post(createProduct);  // router.route("/api/ecommercev1/products/:id").post(createProduct);  // mtlb jb iss url pr post request aii gi tou createProduct function chalay ga
router.route("/products/:id").put(updateProduct).delete(DeleteProduct).get(getProductDetails);  // router.route("/api/ecommercev1/products/:id").put(updateProduct).delete(DeleteProduct);  // mtlb jb iss url pr put request aii gi tou updateProduct function chalay ga



// -------------------------------------------------------
// Exporting Router
module.exports = router;    // router ko export kia hai