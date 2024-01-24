const mongoose = require("mongoose");

const State = mongoose.model(
  "State",
  new mongoose.Schema({
    statename: String,
    geoJSONData: Object,
    country: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country"
      }
    ]
  })
);

module.exports = State;
