const { PRIVATE } = require("./forumTypes");
const Query = {
  getForum: async (_, { id }, { data }) => {
    return await data.Forums.find(f => f.id === id);
  },
  getForums: async (_, args, { data }) => {
    return await data.Forums.filter(forum => forum.forumType !== PRIVATE);
  }
};

const Mutation = {
  createForum: async (_, { id, forumType, name }, { data }) => {
    await data.Forums.push({ id, forumType, name });
    return {
      id,
      forumType,
      name
    };
  }
};

const Forum = {
  messages: async (parent, _, { data }) => {
    return await data.Messages.filter(msg => msg.forumId === parent.id);
  }
};

module.exports = { Query, Mutation, Forum };
