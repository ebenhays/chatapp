This is a chat application built with Node.js, GraphQL, Apollo-Server-Express. It is a backend task for FreshPlanet

### Clone the repository

Clone the project on github at this address git clone https://github.com/ebenhays/chatapp.git

### Install project dependencies

npm install

### Run Application

npm start

### Access application

You can access the application at http://localhost:5000/graphql

### GraphQL Documentation

All GraphQl Schema and its related types, queries and mutations can be found in the graqhql directory in this project.

The Graphql associations used in this projects are all nicely grouped under its respective folders[```Forums, Messages, Users```]

### Forums

All messages posted by users can be found in the forum.

```Schema
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
```

### Messages

This is the information posted by the user

```Schema
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
```

### Users

This is the user of the forum

```Schema
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
```

### Testing the Application

Here are some mutations, and queries to test the application

```Mutations

mutation ADD_USER{
  addUser(username:"lawhays",fullname:"Lawrence Casely Hayford",forumId:"FR100", pictureUrl:"./avatar/andela.jpg"){
    username,
    fullname,
    pictureUrl,
    forums{
      forumType,
      name
    }
  }
}

mutation ADD_FORUM{
  createForum(id: "FR103",name:"My Forum", forumType:PRIVATE){
    name,
    forumType
  }
}

mutation ADD_MSG{
  addMessage(authorId:"ebenhays",message:"Hello World",msgTitle:"Hey!, got you here",forumId:"FR103"){
    authorId,
    message,
    msgTitle,
    postedDate
  }
}

mutation JOIN_PRIVATE_FORUM{
  joinPrivateForum(forumId:"FR100",username:"kofihays"){
    forums{
      forumType
    }
  }
}
```

```Queries

query GET_FORUM{
  getForum(id:"FR101"){
    forumType,
    name
  }
}

query GET_ALL_FORUM{
  getForums{
    id,
    forumType,
    name,
    messages{
      msgTitle,
      message
    }

  }
}


query GET_USER{
  getUser(username:"ebenhays"){
    username,
    fullname,
    pictureUrl,
    forums{
      forumType,
      name
    }
  }
}

query GET_USERS{
  getUsers{
    username,
    pictureUrl,
    fullname,
    forums{
      forumType,
      name
    },

  }
}

query GET_MSG{
  getMessages{
    message,
    msgTitle,
    postedDate,
    postedTime
    forums{
      forumType,
      name
    }
  }
}

query GET_MSG_BY_USER{
  getMessage(authorId:"ebenhays"){
    message,
    message,
    postedDate,
    postedTime,
    forums{
      forumType,
      name
    }
  }
}
```

### Specifications

[The specifications defining the behavior of this server application can be found here](specs.md)

### License

FreshPlanet
