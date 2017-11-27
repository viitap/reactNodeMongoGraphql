const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');

const mongoose = require("mongoose");

// Mongo model
const Selection = mongoose.model("Selections", {
  name: String
});

const LocationType = require('../types/LocationType');

// Mutations
const RootMutationType = new GraphQLObjectType({
  name: "rootMutation",
  fields: () => ({
    fakeNews: {
      type: new GraphQLList(LocationType),
      args: {
        title: { type: GraphQLString }
      },
      resolve: async (value, {title} ) => {
        mongoose.connect(`mongodb://mongo/someSelections`, {
          useMongoClient: true
        });

        const sel = new Selection({
          name: title,
        });

        await sel.save();

        return [{ title }];
      }
    }
  })
})

module.exports = RootMutationType;