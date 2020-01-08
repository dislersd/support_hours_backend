const sessionResolvers = require("./sessions");
const usersResolvers = require("./users");
const blockersResolvers = require("./blockers");

module.exports = {
  Query: {
    ...sessionResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...sessionResolvers.Mutation,
    ...blockersResolvers.Mutation
  }
};
