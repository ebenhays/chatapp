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
  getMessage: async (_, { authorId }, { data }) => {
    try {
      return await data.Messages.filter(msg => msg.authorId === authorId).sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    } catch (error) {
      throw new ApolloError("There was a problem getting message ");
    }
  }
};

const Mutation = {
  addMessage: async (_, { authorId, message, msgTitle, forumId }, { data }) => {
    try {
      await data.Messages.push({
        authorId,
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

const Message = {
  forums: async (parent, _, { data }) => {
    return await data.Forums.filter(forum => forum.id === parent.forumId);
  }
};

module.exports = { Query, Mutation, Message };
