const express = require("express")
const router = express.Router();
const bookcontroller = require("../controllers/book.controller")

router.route("/").post(bookcontroller.createsliderimages);
router.route("/").get(bookcontroller.getBooksByCategory);
router.route("/:id").put(bookcontroller.updatesliderbook)
router.route("/:id").get(bookcontroller.getsliderbook);


module.exports = router;