const { gql } = require("apollo-server");

module.exports = gql`
  type Session {
    id: ID!
    date: String!
    attendees: [String]!
  }
  type Query {
    getSessions: [Session]
  }
`;
