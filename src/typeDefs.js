const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
  id: ID!
  username: String!
}

type Query {
  currentUser: User!
  hello: String!
}

type Mutation {
  register(username: String!, password: String!): User!
  login(username: String!, password: String!): LoginResponse!
}

type LoginResponse {
  token: String
  user: User
}
  
`;

module.exports = typeDefs;
