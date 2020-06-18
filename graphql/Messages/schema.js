const { gql } = require("apollo-server-express");

module.exports = gql`
  type Message {
    message: String!
    msgTitle: String!
    postedDate: String!
    postedTime: String!
    forums: [Forum]
    authorId: String
  }

  extend type Query {
    getMessages: [Message]
    getMessage(authorId: String!): [Message]
  }

  extend type Mutation {
    addMessage(
      authorId: String!
      message: String!
      msgTitle: String!
      forumId: String!
    ): Message
  }
`;
