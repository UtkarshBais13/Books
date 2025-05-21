const express = require("express")
const router = express.Router();
const bookcontroller = require("../controllers/book.controller")


 router.route("/").get(bookcontroller.getBookforReaders);





module.exports = router;