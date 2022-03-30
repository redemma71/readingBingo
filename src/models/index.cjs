// const dbConfig = require("../conf/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/bingo";

module.exports = db;