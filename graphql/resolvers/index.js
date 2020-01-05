const sessionResolvers = require("./sessions");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...sessionResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...sessionResolvers.Mutation
  }
};
