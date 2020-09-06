const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");
const isEmail = require("isemail");
const UserAPI = require("./datasources/user");
const BlackCardAPI = require("./datasources/blackCard");
const WhiteCardAPI = require("./datasources/whiteCard");
const CardPackAPI = require("./datasources/cardPack");
const store = createStore();

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || "";
  const email = new Buffer.from(auth, "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return { user };
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    blackCardAPI: new BlackCardAPI({ store }),
    userAPI: new UserAPI({ store }),
    whiteCardAPI: new WhiteCardAPI({ store }),
    cardPackAPI: new CardPackAPI({ store }),
  }),
  context,
  introspection: true,
  playground: true,
  engine: {
    reportSchema: true,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
