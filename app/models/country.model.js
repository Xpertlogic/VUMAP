const mongoose = require("mongoose");

const Country = mongoose.model(
  "Country",
  new mongoose.Schema({
    countryname: String,
    geoJSONData: Object,
  })
);

module.exports = Country;
