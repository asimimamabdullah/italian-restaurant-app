const User = require("../models/User");

exports.users = async (req, res, next) => {
  try {
    const users = await User.find().select("-role -_id -password -city -__v");

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return next(error);
  }
};
