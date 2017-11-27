const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const myGraphQLSchema = require('./graphql/Schema');
const PORT = 3000;

const app = express();


// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled


const k = async (req, res) => {
  const koskiData = await fetch('http://fake-services:3000/fake-services/fishing/all-locations');
  return await koskiData.json();
}

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
  res.json({ok: 'ok'})
})

app.get('/locations', async (req, res) => {
  const locations = await k();
  res.json(locations);
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))