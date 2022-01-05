const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please provide your name"],
	},
	lastName: {
		type: String,
		required: [true, "Please Provide your name"],
	},

	email: {
		type: String,
		required: [true, "Please provide an email address"],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide a valid email",
		],
	},
	images: {
		type: Object,
		default: {},
	},

	password: {
		type: String,
		required: [true, "Please add a password"],
		minlength: 6,
		select: false,
	},

	address: {
		type: String,
	},
	building: {
		type: String,
	},

	postalCode: {
		type: String,
		trim: true,
	},

	city: {
		type: String,
		trim: true,
	},

	userOrders: {
		type: String,
		trim: true,
	},

	phone: {
		type: String,
		trim: true,
	},
	pendingOrders: {
		type: Array,
		default: [],
	},
	orders: {
		type: Array,
		default: [],
	},

	role: {
		type: Number,
		default: 0,
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

userSchema.methods.matchPasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAccessToken = async function () {
	return jwt.sign({ id: this._id }, process.env.access_token_secret, {
		expiresIn: "11min",
	});
};

userSchema.methods.getRefreshToken = async function () {
	return jwt.sign({ id: this._id }, process.env.refresh_token_secret, {
		expiresIn: "7d",
	});
};

userSchema.methods.getSignedToken = async function () {
	return jwt.sign({ id: this._id }, process.env.jwt_secret, {
		expiresIn: process.env.jwt_expire,
	});
};

userSchema.methods.getResetPasswordToken = async function () {
	const resetToken = crypto.randomBytes(25).toString("hex");

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
