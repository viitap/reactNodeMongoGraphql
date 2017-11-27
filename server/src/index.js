const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');


const myGraphQLSchema = {};
const PORT = 3000;

const app = express();


// bodyParser is needed just for POST.
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled


// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {

  res.json({ok: 'ok'})

})


app.listen(3000, () => console.log('Example app listening on port 3000!'))