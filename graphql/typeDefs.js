const { gql } = require("apollo-server");

module.exports = gql`
  type Session {
    id: ID!
    date: String!
    attendees: [ID]!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    role: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getSessions: [Session]
    getSession(sessionId: ID!): Session
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createSession: Session!
    deleteSession(sessionId: ID!): String!
    joinSession(sessionId: ID!): String!
    leaveSession(sessionId: ID!): String!
  }
`;
