const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getForum(id: ID!): Forum
    getForums: [Forum]
  }

  type Forum {
    id: ID!
    forumType: ForumType
    name: String!
    messages: [Message]
  }

  enum ForumType {
    PRIVATE
    PUBLIC
  }
  extend type Mutation {
    createForum(id: ID!, forumType: ForumType, name: String!): Forum
  }
`;
