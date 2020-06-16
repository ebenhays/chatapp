const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getForum(id: ID!): Forum
    getForums: [Forum]
  }

  type Forum {
    id: ID!
    forumType: String!
    name: String!
    messages: [Messages]
  }

  extend type Mutation {
    createForum(id: ID!, forumType: String!, name: String!): Forum
  }
`;
