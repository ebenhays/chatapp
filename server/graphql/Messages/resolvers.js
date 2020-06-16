const { ApolloError } = require("apollo-server-express");
const dayjs = require("dayjs");
const calendar = require("dayjs/plugin/calendar");
dayjs.extend(calendar);

const Query = {
  getMessages: async (_, args, { data }) => {
    try {
      return await data.Messages.slice().sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    } catch (error) {
      throw new ApolloError("There was a problem retriveing data");
    }
  },
  getMessage: async (_, { userId }, { data }) => {
    try {
      return await data.Messages.filter(msg => msg.userId === userId).sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    } catch (error) {
      throw new ApolloError("There was a problem getting message ");
    }
  }
};

const Mutation = {
  addMessage: async (_, { userId, message, msgTitle, forumId }, { data }) => {
    try {
      await data.Messages.push({
        userId,
        message,
        postedDate: dayjs().calendar(null, {
          sameElse: "DD/MM/YYYY"
        }),
        postedTime: dayjs().calendar(null, {
          sameDay: "h:mm A"
        }),
        msgTitle,
        forumId
      });
    } catch (error) {
      throw new ApolloError(
        "There was a problem saving message " + error.message,
        500
      );
    }
  }
};

const Messages = {
  forum: async (parent, _, { data }) => {
    return await data.Forums.filter(forum => forum.id === parent.forumId);
  },
  user: async (parent, _, { data }) => {
    return await data.Users.filter(user => user.username === parent.userId);
  }
};

module.exports = { Query, Mutation, Messages };
