const { Schema, model } = require("mongoose");

const orderSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  postalCode: {
    type: String,
    required: true,
    trim: true,
  },

  orders: {
    type: Array,
    default: [],
  },
});

module.exports = model("Order", orderSchema);
