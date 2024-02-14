// importing modules to use in this file
const express = require("express");
const { getProducts, createProduct, updateProduct, DeleteProduct, getProductDetails } = require("../Controllers/ProductController");
const { AuthenticateUser, isUserAdmin } = require("../middleware/Authenticate");

// -------------------------------------------------------
// Router Creation 
const router = express.Router();  // router ka object bana lia    ab routes bna skta hain

router.route("/products").get(getProducts);  // router.route("/api/ecommercev1/products").get(getProducts);  // router ka object bana lia    ab routes bna skta hain
router.route("/products/:id").get(getProductDetails);  // router.route("/api/ecommercev1/products/:id").get(getProductDetails);  // mtlb jb iss url pr get request aii gi tou getProductDetails function chalay ga

router.route("/admin/products/new").post(AuthenticateUser, isUserAdmin("admin"), createProduct);  // router.route("/api/ecommercev1/products/:id").post(createProduct);  // mtlb jb iss url pr post request aii gi tou createProduct function chalay ga
router.route("/admin/products/:id").put(AuthenticateUser, isUserAdmin("admin"), updateProduct).delete(AuthenticateUser, isUserAdmin("admin"), DeleteProduct);  // router.route("/api/ecommercev1/products/:id").put(updateProduct).delete(DeleteProduct);  // mtlb jb iss url pr put request aii gi tou updateProduct function chalay ga

// -------------------------------------------------------
// Exporting Router
module.exports = router;    // router ko export kia hai