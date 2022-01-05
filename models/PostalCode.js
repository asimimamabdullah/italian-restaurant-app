const { Schema, model } = require("mongoose");

const postalCodeSchema = Schema(
  {
    postalCode: {
      type: String,
      unique: true,
      required: [true, "Please provide a postal code"],
    },

    minOrder: {
      type: String,
      required: true,
    },

    deliveryPrice: {
      type: String,
      required: true,
    },

    estimatedTime: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("PostalCode", postalCodeSchema);
