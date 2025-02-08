const express = require("express")
const router = express.Router();
const bookcontroller = require("../controllers/book.controller")

router.route("/").post(bookcontroller.createbook);
router.route("/:id").put(bookcontroller.updatebook);
router.route("/:id").delete(bookcontroller.deletebook);
 router.route("/:id").get(bookcontroller.getbook);
router.route("/").get(bookcontroller.getbooks);





module.exports = router;