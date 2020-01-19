const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../utils/check-auth");
const User = require("../../models/User");

module.exports = {
  Mutation: {
    createBlocker: async (_, { sessionId, body }, context) => {
      const { id } = checkAuth(context);
      if (body.trim === "") {
        throw new UserInputError("Empty blocker", {
          errors: {
            body: "Blocker must not be empty"
          }
        });
      }
      const user = await User.findById(id);
      if (user) {
        user.blockers.push({
          body,
          forSession: sessionId
        });
        await user.save();
        return user;
      } else throw new UserInputError("User not found");
    }
  }
};
