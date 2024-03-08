var express = require("express");
var router = express.Router();
const productsRouter = require("./api/products");
const ordersRouter = require("./api/orders");

/* GET home page. */
router.use("/products", productsRouter);
router.use("/orders", ordersRouter);

module.exports = router;
