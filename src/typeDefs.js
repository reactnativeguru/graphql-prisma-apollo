const GraphQLPrisma = require('./generated/prisma-client/prisma-schema')

const { gql } = require('apollo-server');
const typeDefs = gql`

type Link {
  id: ID!
  description: String!
  url: String!
}

  type User {
  id: ID!
  username: String!
}

type Query {
  currentUser: User!
  hello: String!
  feed: [Link!]!
  user: User
  buildsters: [Buildster]
}

type Buildster {
  id: ID! 
  bio: String!
  image: String!
  createdAt: String
  email: String
  # user: User!
}

type Mutation {
  feedLinks(description: String, url: String!) : Link!
  register(username: String!, password: String!): User!
  login(username: String!, password: String!): LoginResponse!
  createBuildSter(bio: String!, email: String!, image: String): Buildster!

}


type LoginResponse {
  token: String
  user: User
}




  
`;

module.exports = typeDefs;
