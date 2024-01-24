const db = require("../../models");
const { encoder } = require("../../middlewares");

const State = db.state;
const Country = db.country;
exports.create = async (req, res) => {
  const { statename,countryname } = req.body;
  console.log(statename,"statename=========")
  const geoJSONData = JSON.parse(req.file.buffer.toString())
  console.log(geoJSONData)
  try {
      let country = await Country.findOne(
        {
          countryname: { $in: countryname },
        })
          if(!country){
            res.send({ message: "Invalid Country" });
          }
        console.log(country)
        country = country._id
        const state = new State({ statename, geoJSONData,country });
        console.log(state)
        state.save((err, state) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send(state);
        });
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
      };
exports.find = async (req, res) => {
  try {
    let state = await State.find({}).populate({
      path: 'country',
      select:
      'countryname',
     });
    state = await Promise.all( state.map(async function (value) {
       value.geoJSONData = await encoder.encode(value.geoJSONData);
       return value
    }));
    console.log(state)
    res.status(200).send(state);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  };
exports.findName = async (req, res) => {
  try {
    let state = await State.find({},{countryname:1});
    console.log(state)
    res.status(200).send(state);
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