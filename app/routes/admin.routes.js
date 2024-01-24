const { authJwt } = require("../middlewares");
const multer = require('multer');
const upload = multer()
const controller = require("../controllers/user.controller");
const CountryController = require("../controllers/admin/country.controller");
const StateController = require("../controllers/admin/state.controller");
const AdminController = require("../controllers/admin/admin.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/v1/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.post(
    "/api/v1/admin/country",upload.single('countryData'),
    [authJwt.verifyToken, authJwt.isAdmin],
    CountryController.create
  );
  app.get(
    "/api/v1/admin/country",
    [authJwt.verifyToken, authJwt.isAdmin],
    CountryController.find
  );
  app.get(
    "/api/v1/admin/country/name",
    [authJwt.verifyToken, authJwt.isAdmin],
    CountryController.findName
  );

  //state Route
  app.post(
    "/api/v1/admin/state",upload.single('stateData'),
    [authJwt.verifyToken, authJwt.isAdmin],
    StateController.create
  );
  app.get(
    "/api/v1/admin/state",upload.single('stateData'),
    [authJwt.verifyToken, authJwt.isAdmin],
    StateController.find
  );
  app.post(
    "/api/v1/admin/decode",
    [authJwt.verifyToken, authJwt.isAdmin],
    CountryController.decode
  );

  app.post(
    "/api/v1/admin/verifytoken",
    [authJwt.verifyUIToken],
    AdminController.verifyToken
  );
};
