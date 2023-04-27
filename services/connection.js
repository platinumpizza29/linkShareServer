const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

var connection = mongoose.connect(process.env.DB_CONNECT);

module.exports = connection;
