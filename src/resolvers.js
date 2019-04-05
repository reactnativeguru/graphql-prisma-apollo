const bcrypt = require('bcryptjs');
// resolvers needed for Query and Mutations subsciptions return
const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
  Mutation: {
    // resolver signature
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
  },
};

module.exports = resolvers;
