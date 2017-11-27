const {
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");

const LocationType = new GraphQLObjectType({
  name: "Location",
  description: "...",

  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: location => location.title
    }
  })
});

module.exports = LocationType;