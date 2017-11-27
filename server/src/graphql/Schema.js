// "Cheats" https://github.com/mpj/fff-graphql-goodreads

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull

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

// Mutations
const RootMutationType = new GraphQLObjectType({
  name: "rootMutation",
  fields: () => ({
    fakeNews: {
      type: new GraphQLList(LocationType),
      args: {
        title: { type: GraphQLString }
      },
      resolve: (value, {title} ) => {
        return [{ title }];
      }
    }
  })
})

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
