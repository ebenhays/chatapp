const forumResolver = require("./Forums/resolvers");
const forumSchema = require("./Forums/schema");
const UsersResolver = require("./Users/resolvers");
const UsersSchema = require("./Users/schema");
const MessagesResolver = require("./Messages/resolvers");
const MessagesSchema = require("./Messages/schema");
const rootSchema = require("./root");

exports.allResolvers = [forumResolver, UsersResolver, MessagesResolver];
exports.allSchemas = [rootSchema, forumSchema, UsersSchema, MessagesSchema];
