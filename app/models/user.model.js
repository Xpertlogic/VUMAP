const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    company: String,
    password: String,
    isactive:{
      type: Boolean,
      default: true,
    },
    isverified:{
      type: Boolean,
      default: false,
    },
    tier:{
      type: String,
      enum: ['free', 'tier1', 'tier2'],
      default: 'free',
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
