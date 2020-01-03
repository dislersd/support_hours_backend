const { gql } = require("apollo-server");

module.exports = gql`
  type Session {
    id: ID!
    date: String!
    attendees: [String]!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getSessions: [Session]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;