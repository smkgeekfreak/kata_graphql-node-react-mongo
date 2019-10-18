const express = require('express')
const logger = require('./logger')('graphql-server','info'); //TODO: replace with env var

const app = express();

//TODO: externalize to env variable
const SERVER_PORT = 4100;

app.listen(SERVER_PORT, () => {
  logger.info(`server started on ${SERVER_PORT}`);
});
