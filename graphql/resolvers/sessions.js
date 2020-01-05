const Session = require("../../models/Session");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getSessions() {
      try {
        const sessions = await Session.find();
        return sessions;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getSession(_, { sessionId }) {
      try {
        const session = await Session.findById(sessionId);
        if (session) {
          return session;
        } else {
          throw new Error("Session not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    async createSession(_, {}, context) {
      const user = checkAuth(context);
      console.log(user);

      const newSession = new Session({
        date: new Date().toISOString(),
        attendees: []
      });

      const session = await newSession.save();

      return session;
    },
    // async joinSession(_, {}, context){

    // }
  }
};
