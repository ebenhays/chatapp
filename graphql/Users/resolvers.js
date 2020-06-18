const { ApolloError } = require("apollo-server-express");
const { PRIVATE } = require("../Forums/forumTypes");
const Query = {
  getUsers: async (_, args, { data }) => {
    return await data.Users;
  },
  getUser: async (_, { username }, { data }) => {
    return await data.Users.find(user => user.username === username);
  }
};
const Mutation = {
  addUser: async (_, { username, fullname, forumId, pictureUrl }, { data }) => {
    await data.Users.push({ username, fullname, forumId, pictureUrl });
  },
  joinPrivateForum: async (_, { forumId, username }, { data }) => {
    const { forumType } = await data.Forums.find(forum => forum.id === forumId);
    const {
      fullname,
      pictureUrl,
      forumId: userforumId
    } = await data.Users.find(user => user.username === username);

    if (forumId === userforumId) {
      throw new ApolloError("You are already Joined to this forum");
    }

    if (forumType !== null || undefined) {
      if (forumType === PRIVATE) {
        await data.Users.push({ username, fullname, forumId, pictureUrl });
      } else {
        throw new ApolloError("Sorry, You cannot join this forum");
      }
    } else {
      throw new ApolloError("Invalid Forum ID!!");
    }
  }
};
const Users = {
  forums: async (parent, _, { data }) => {
    return await data.Forums.filter(f => f.id === parent.forumId);
  }
};

module.exports = { Query, Mutation, Users };
