// const dbConfig = require("../conf/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/bingo";
db.players = require("./player.model.cjs")(mongoose);

module.exports = db;