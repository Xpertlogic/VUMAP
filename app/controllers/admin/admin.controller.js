const db = require("../../models");
const User = db.user;
exports.verifyToken = async (req, res) => {
    try {
     console.log(req.userId)
     User.findOne({
        _id: req.userId,
      })
        .populate("roles", "-__v")
        .exec((err, user) => {

          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send(user);
       })
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
    };