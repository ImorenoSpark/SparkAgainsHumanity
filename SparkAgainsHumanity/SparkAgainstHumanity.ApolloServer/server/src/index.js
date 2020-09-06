const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");

const UserAPI = require("./datasources/user");
const BlackCardAPI = require("./datasources/blackCard");
const WhiteCardAPI = require("./datasources/whiteCard");

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    blackCardAPI: new BlackCardAPI({ store }),
    userAPI: new UserAPI({ store }),
    whiteCardAI: new WhiteCardAPI({ store }),
  }),
  engine: {
    reportSchema: true,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
