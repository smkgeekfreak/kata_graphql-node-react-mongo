const mongoose = require('mongoose');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const logger = require('./logger')('graphql-server','info'); //TODO: replace with env var
const schema = require('./schema/schema');
const app = express();

//TODO: externalize to env variable
const SERVER_PORT = 4100;

mongoose.connect('mongodb://librarian:books@localhost:32768/bookstore');
mongoose.connection.once('open',()=>{
  logger.info('connected to bookstore db');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
/**
 * Stha
 */
app.listen(SERVER_PORT, () => {
  logger.info(`server started on ${SERVER_PORT}`);
});
