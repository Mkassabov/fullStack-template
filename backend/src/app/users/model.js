const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { toJSON: { versionKey: false }, toObject: { versionKey: false } }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
