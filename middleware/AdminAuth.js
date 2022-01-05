const ErrorResponse = require("../utils/errorResponse");

exports.adminAuth = async (req, res, next) => {
  if (req.user.role === 0)
    next(new ErrorResponse("Not Authorized to access this route", 400));
  if (req.user.role === 1) next();
};
