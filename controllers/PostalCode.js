const PostalCode = require("../models/PostalCode");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

const Location = {
  getPostalCode: async (req, res, next) => {
    try {
      const codes = await PostalCode.find();
      if (!codes) return next(new ErrorResponse("No Postal Code Found", 401));
      return res.status(200).json({ success: true, codes });
    } catch (error) {
      next(error);
    }
  },

  getOnePostalCode: async (req, res, next) => {
    try {
      const { postalCode } = req.params;

      const code = await PostalCode.findOne({ postalCode });
      if (!code)
        return res.status(404).json({
          success: false,
          error: "Delivery not available at your location",
        });

      return res.status(200).json({ success: true, code });
    } catch (error) {
      next(error);
    }
  },

  createPostalCode: async (req, res, next) => {
    try {
      const { postalCode, minOrder, deliveryPrice, estimatedTime, active } =
        req.body;

      if (!postalCode || !minOrder || !deliveryPrice || !estimatedTime)
        return next(
          new ErrorResponse(
            "Incomplete Credentials, Please provide all the information"
          )
        );

      const code = await PostalCode.create({
        postalCode,
        minOrder,
        deliveryPrice,
        estimatedTime,
        active,
      });

      return res
        .status(200)
        .json({ success: true, message: "Successful", code });
    } catch (error) {
      next(error);
    }
  },

  updatePostalCode: async (req, res, next) => {
    try {
      const { postalCode, minOrder, deliveryPrice, estimatedTime, active } =
        req.body;

      const { id } = req.params;

      const code = await PostalCode.findByIdAndUpdate(id, {
        postalCode,
        minOrder,
        deliveryPrice,
        estimatedTime,
        active,
      });

      if (!code)
        return next(
          new ErrorResponse("No Postal Code Found with this id", 401)
        );

      return res
        .status(200)
        .json({ success: true, message: "Successfully Updated a location" });
    } catch (error) {
      return next(error);
    }
  },

  deletePostalCode: async (req, res, next) => {
    try {
      const { id } = req.params;

      await PostalCode.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Successfully deleted a postal Code",
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = Location;
