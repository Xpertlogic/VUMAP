const db = require("../../models");
const { encoder } = require("../../middlewares");

const Country = db.country;
exports.create = async (req, res) => {
  const { countryname } = req.body;
  const geoJSONData = JSON.parse(req.file.buffer.toString())
  try {
    const country = new Country({ countryname, geoJSONData });
    let countryData = await country.save();
    res.send(encoder.encode(countryData));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  };
exports.find = async (req, res) => {
  try {
    let country = await Country.find({});
    country = await Promise.all( country.map(async function (value) {
       value.geoJSONData = await encoder.encode(value.geoJSONData);
       return value
    }));
    console.log(country)
    res.status(200).send(country);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  };
exports.findName = async (req, res) => {
  try {
    let country = await Country.find({},{countryname:1});
    console.log(country)
    res.status(200).send(country);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  };

  exports.decode = async (req, res) => {
    try {
      console.log(req.body)
      let geoJSONData = await encoder.decode(req.body.value,req.body.key,res);
      console.log(geoJSONData,"geoJSONData")
      res.status(200).send(geoJSONData);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
    };