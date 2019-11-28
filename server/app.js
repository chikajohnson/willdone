const winston = require("winston");
const express = require("express");
const config = require("config");
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

//parse application/x-ww-form-urlencoded
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => {
  winston.info(`Listening on dedicated port  ${port}...`);
  winston.info(process.env.PORT);
}
);

module.exports = server;
