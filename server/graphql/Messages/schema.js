const { gql } = require("apollo-server-express");

module.exports = gql`
  type Messages {
    user: [Users]
    message: String!
    msgTitle: String!
    postedDate: String!
    postedTime: String!
    forum: [Forum]
    userId: String
  }

  extend type Query {
    getMessages: [Messages]
    getMessage(userId: String!): [Messages]
  }

  extend type Mutation {
    addMessage(
      userId: String!
      message: String!
      msgTitle: String!
      forumId: String!
    ): Messages
  }
`;
