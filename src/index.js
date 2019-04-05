const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { prisma } = require('./generated/prisma-client/index');

// get current user function
const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, 'my-secret-jwt-sign-string'); // verify if token was signed with our jwt secret
    }
    return null;
  } catch (err) {
    console.log(e)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({req}) => {
    // gets the token from the header and verifies and decodes 
    //it using the helper function getToken, 
    //Then it returns the user in the context function along with the prisma instance 
    //so that these are available in every resolver we create.
    const tokenWithBearer = req.headers.authorization || "";
    const token = tokenWithBearer.split(" ")[1];
    const user = getUser(token);
    return {
      user,
      prisma // the generated prisma client if you are using it
    }; 
  }
});

server
  .listen({
    port: 8383,
  })
  .then((info) =>
    console.log(`Server started on http://localhost:${info.port}`)
  );
