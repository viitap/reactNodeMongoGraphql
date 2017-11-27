// "Cheatz" https://github.com/mpj/fff-graphql-goodreads

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull

} = require("graphql");

const  LocationType = require('./types/LocationType');
const  RootMutationType = require('./mutations/RootMutationType');


// Export schema
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "...",

    fields: () => ({
      location: {
        type: new GraphQLList(LocationType),
        resolve: root => [{ title: "Foobar" }]
      }
    })
  }),
  mutation: RootMutationType
});
