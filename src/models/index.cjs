require("dotenv").config({ path: 'src/conf/config.dev.env' });

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let db = {};
db.mongoose = mongoose;
db.url = `mongodb://localhost:27017/bingo`;
// db.url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/bingo`;

module.exports = db;