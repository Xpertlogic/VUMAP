const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.country = require("./country.model");
db.state = require("./state.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;