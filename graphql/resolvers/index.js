const sessionResolvers = require("./sessions");
// const userResolvers = require("./users");

module.exports = {
  Query: {
    ...sessionResolvers.Query
  }
};
