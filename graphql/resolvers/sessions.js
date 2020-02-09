const { AuthenticationError } = require("apollo-server");

const Session = require("../../models/Session");
const User = require("../../models/User");
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
    async createSession(_, { sessionDate }, context) {
      const user = checkAuth(context);

      try {
        if (user.role === "admin") {
          const newSession = new Session({
            date: sessionDate,
            attendees: []
          });

          const session = await newSession.save();

          return session;
        } else {
          throw new AuthenticationError(
            "You are not authorized to create a new session"
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteSession(_, { sessionId }, context) {
      const user = checkAuth(context);
      try {
        const session = await Session.findById(sessionId);
        if (user.role === "admin") {
          await session.delete();
          return "Session deleted successfully";
        } else {
          throw new AuthenticationError(
            "You are not authorized to delete a session"
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async joinSession(_, { sessionId }, context) {
      const user = checkAuth(context);
      try {
        if (user) {
          const session = await Session.findById(sessionId);
          if (session) {
            if (session.attendees.includes(user.username)) {
              throw new Error("You have already joined this session");
            }
            session.attendees.push(user.username);
            await session.save();

            const dbUser = await User.findById(user.id);

            dbUser.sessions.push(sessionId);
            await dbUser.save();

            return session;
          } else {
            throw new Error("Session not found");
          }
        } else {
          throw new Error("You must be logged in to join a session");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async leaveSession(_, { sessionId }, context) {
      const user = checkAuth(context);
      try {
        if (user) {
          console.log(user);
          const session = await Session.findById(sessionId);
          if (session) {
            await session.attendees.pull(user.username);
            await session.save();

            const userFromDb = await User.findById(user.id);

            if (
              userFromDb.blockers.filter(b => b.forSession === sessionId)
                .length > 0
            ) {
              const blockerIndex = userFromDb.blockers.findIndex(
                b => b.forSession === sessionId
              );

              if (userFromDb.blockers[blockerIndex].forSession === sessionId) {
                userFromDb.blockers.splice(blockerIndex, 1);
                await userFromDb.save();
              }
            } else {
              console.log("no blockers");
            }

            return session;
            
          } else {
            throw new Error("Session not found");
          }
        } else {
          throw new Error("You must be logged in to do that");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
