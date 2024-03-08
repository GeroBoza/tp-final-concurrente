var express = require("express");

const router = express.Router();

const ordersController = require("../../controllers/ordersController");

router.get("/all", ordersController.getAllOrders);

router.post("/new", ordersController.newOrder);

module.exports = router;
