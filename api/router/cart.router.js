const express = require("express")
const router = express.Router();
const cartcontroller = require("../controllers/cart.controller")

router.route("/:userId").get(cartcontroller.fetchCart);
router.route("/").post(cartcontroller.postCart);

module.exports = router;