const express = require("express");
const { adminAuth } = require("../middleware/AdminAuth");
const { protect } = require("../middleware/protect");
const {
	register,
	login,
	forgotPassword,
	resetPassword,
	refreshToken,
	logout,
	createOrder,
	getOrders,
	allOrders,
	updateOrder,
} = require("../controllers/auth");
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/allorders").get(protect, adminAuth, allOrders);

router.route("/createorder").post(createOrder);

router.route("/getorders/:id").get(getOrders);

router.route("/updateorder/:orderNumber").patch(updateOrder);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

router.route("/rtfat").get(refreshToken);

module.exports = router;
