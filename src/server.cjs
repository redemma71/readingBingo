const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {create, findAll, findOne, update} = require('./controllers/bingo.controller.cjs');

/* 
    Set up the app
*/
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

// connect to mongodb
const db = require("./models/index.cjs");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    console.log(`${process.env.BOOYA}`);
    console.log(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/bingo`);
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// configure cors
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/bingo', express.static(path.join(__dirname, '../public/')));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.json({"route":"/","working":true, "message":"hello world"});
});

app.get('/findAll', findAll);
app.post('/create', create);
app.post('/find', findOne);
app.post('/update', update);

// set port, listen for requests
const PORT = process.env.PORT || 4300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
