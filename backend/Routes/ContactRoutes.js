const express = require("express");
let router = express.Router();
const { createContact } = require("../Controllers/contactController");
const { AuthenticateUser } = require("../middleware/Authenticate");



router.post("/contact", AuthenticateUser, createContact);


module.exports = router;