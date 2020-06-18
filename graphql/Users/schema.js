const { gql } = require("apollo-server-express");
module.exports = gql`
  type Users {
    username: String!
    fullname: String!
    pictureUrl: String!
    forums: [Forum]
  }
  extend type Query {
    getUser(username: String): Users
    getUsers: [Users]
  }

  extend type Mutation {
    addUser(
      username: String!
      fullname: String!
      forumId: String!
      pictureUrl: String!
    ): Users
    joinPrivateForum(forumId: String!, username: String!): Users
  }
`;
