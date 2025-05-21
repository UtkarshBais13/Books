const express = require("express")
const router = express.Router();
const cartController = require("../controllers/cart.controller")

router.route("/").post(cartController.addToCart);
router.route("/:id").delete(cartController.removeFromCart)
router.route("/").get(cartController.getAllCartItems);
router.route("/:id").get(cartController.getCartItemsByUser);

module.exports = router;