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
  }
};
const Users = {
  forum: async (parent, _, { data }) => {
    return await data.Forums.filter(f => f.id === parent.forumId);
  }
};

module.exports = { Query, Mutation, Users };
