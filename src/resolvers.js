const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// resolvers needed for Query and Mutations subscriptions return
const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
  Mutation: {
    // register resolver signature
    // paci - pronounced as a racial slur - parent, arguments, context, info
    register: async (parent, { username, password }, ctx, info) => {
      // has password
      const hashedPassword = await bcrypt.hash(password, 10);
      // use prisma to create user
      const user = await ctx.prisma.createUser({
        username,
        password: hashedPassword,
      });
      return user;
    },
    // login resolver
    login: async (parent, { username, password }, ctx, info) => {
      const user = await ctx.prisma.user({ username });
      if (!user) {
        throw new Error('Invalid login');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Invalid login password');
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.email,
        },
        'secret-variable', // jwt secret used to sign jwt
        {
          expiresIn: '30d', // token expires in 30 days
        }
      );
      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;


