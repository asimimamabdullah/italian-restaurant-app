const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    product_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "there should be a title"],
    },
    price: {
      type: Number,
      required: [true, "You have to specify Price"],
    },

    description: {
      type: String,
      // required: true,
      // minlength: 6,
    },

    images: {
      type: Object,
    },

    category: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
