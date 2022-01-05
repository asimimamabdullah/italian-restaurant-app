const { Schema, model } = require("mongoose");

const reservoirSchema = Schema(
  {
    time: {
      type: String,
      required: [true, "Please provide the time"],
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    persons: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    phone: {
      type: String,
    },

    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Reservoir", reservoirSchema);
