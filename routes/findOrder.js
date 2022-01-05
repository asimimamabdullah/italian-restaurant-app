const router = require("express").Router();
const express = require("express");
const Order = require("../models/Orders");

router.route("/findorder/:orderID").get(async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderID });
  if (!order)
    return res
      .status(400)
      .json({ success: false, error: "Your order couldn't be located" });

  return res.status(200).json({ success: true, order });
});

module.exports = router;
