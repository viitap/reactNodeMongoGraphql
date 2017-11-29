const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const mongoose = require('mongoose');
const myGraphQLSchema = require('./graphql/Schema');


const app = express();

// Mongo configs
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('Connected to Mongo');
});

// Enable mongo promises
mongoose.Promise = global.Promise;

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

// Fetch locations from fake service
const getLocations = async () => {
  const koskiData = await fetch('http://fake-services:3000/fake-services/fishing/all-locations');
  return koskiData.json();
};

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
  res.json({ ok: 'ok' });
});

app.get('/locations', async (req, res) => {
  const locations = await getLocations();
  res.json(locations);
});

app.listen(3000, () => console.log('Node server is listening on port 3000!'));
