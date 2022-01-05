const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const PushNotifications = require("@pusher/push-notifications-server");
const User = require("../models/User");
const Order = require("../models/Orders");
const ErrorResponse = require("../utils/errorResponse");
const PostalCode = require("../models/PostalCode");

let beamsClient = new PushNotifications({
	instanceId: "8f9950c1-3405-4dfd-a3a1-48254faff0a3",
	secretKey:
		"7F0291D5E3BBDB90C5F120A937FB3FEC08DDCF080316172C7DE8DA6E03ADBAF7",
});

exports.register = async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		address,
		building,
		postalCode,
		city,
		images,
	} = req.body;

	try {
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			address,
			building,
			postalCode,
			city,
			images,
		});
		sendToken(user, 201, res);
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(
			new ErrorResponse("Please provide an email and password", 400)
		);

	try {
		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return next(new ErrorResponse("Invalid Credentials", 404));
		}

		const isMatch = await user.matchPasswords(password);

		if (!isMatch) return next(new ErrorResponse("Wrong Password", 401));

		sendToken(user, 200, res);
	} catch (error) {
		res.status(500).json({ error: error });
	}
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	if (!email) return next(new ErrorResponse("Please provide an email"));

	try {
		const user = await User.findOne({ email });

		if (!user) return next(new ErrorResponse("no email found", 404));

		const resetToken = await user.getResetPasswordToken();

		await user.save();

		const resetUrl = `/resetpassword/${resetToken}`;

		res.status(201).json({ success: true, data: user, resetUrl });
	} catch (err) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save();

		return next(new ErrorResponse("Password Reset Unsuccessful", 500));
	}
};

exports.resetPassword = async (req, res, next) => {
	const { password } = req.body;
	const { resetToken } = req.params;

	if (!password) return next(new ErrorResponse("Please Provide a password"));

	try {
		const resetPasswordToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user)
			return next(
				new ErrorResponse("No user found with the given token", 404)
			);

		user.password = password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		res.status(200).json({
			success: true,
			user,
			resetToken,
			message: "successfully password changed",
		});
	} catch (err) {
		next(new ErrorResponse("Reset was Unsuccessful", 400));
	}
};

exports.refreshToken = async (req, res, next) => {
	const rtfat = req.cookies.rtfat;

	try {
		if (!rtfat)
			res.status(400).json({ success: true, error: "Not Found Token" });

		const decode = jwt.verify(rtfat, process.env.refresh_token_secret);

		const user = await User.findById(decode.id);

		if (!user) next(new ErrorResponse("No user found with this id", 404));

		const accessToken = await user.getAccessToken();
		res.json({ accessToken });
	} catch (err) {
		next(err);
	}
};

exports.logout = async (req, res, next) => {
	try {
		res.clearCookie("rtfat", { path: "/api/user/rtfat" });
		return res.json({ msg: "Logged out" });
	} catch (err) {
		next(err);
	}
};

exports.createOrder = async (req, res, next) => {
	const { orders } = req.body;
	try {
		const order = await Order.create(orders);
		if (!order) {
			return res.status(500).json({
				success: false,
				error: "payment received order not generated",
			});
		}

		if (order) {
			beamsClient.publishToInterests(["hello_61753cb9d57ce1442c2d89f2"], {
				web: {
					notification: {
						title: "New Order!",
						body: "You have a new order. Don't worry I have printed the receipt for you",
						deep_link: "https://shahiristorante.it",
						icon: "https://cdn-icons-png.flaticon.com/512/1008/1008010.png",
					},
					data: {
						msg: order,
					},
				},
			});
		}

		return res.status(200).json({ success: true, msg: "Order Successful" });
	} catch (error) {
		next(error);
	}
};

exports.getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({ userID: req.params.id });

		res.status(200).json({ success: true, orders });
	} catch (error) {
		next(error);
	}
};

exports.allOrders = async (req, res, next) => {
	try {
		const u = await Order.find();
		// u.sort("-createdAt");
		// console.log(new Date(u.sort('')[9].time).toLocaleString());
		return res.status(200).json({ success: true, orders: u });
	} catch (error) {
		next(error);
	}
};

exports.updateOrder = async (req, res, next) => {
	try {
		const { orderStatus } = req.body;
		const { orderNumber } = req.params;

		const order = await Order.findOneAndUpdate(
			{ orderNumber },
			{ orderStatus: req.body.orderStatus },
			{ new: true }
		);

		return res.status(200).json({ success: "true", data: order });
	} catch (error) {
		next(error);
	}
};

const sendToken = async (user, statusCode, res) => {
	const accessToken = await user.getAccessToken();
	const refreshToken = await user.getRefreshToken();

	res.cookie("rtfat", refreshToken, {
		httpOnly: true,
		path: "/api/user/rtfat",
		maxAge: 7 * 60 * 60 * 1000, //7d
	});

	return res.status(statusCode).json({
		success: true,
		postalCode: user.postalCode,
		accessToken,
		id: user._id,
	});
};
