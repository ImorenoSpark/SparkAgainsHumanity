const { paginateResults } = require("./utils");

module.exports = {
  Query: {
    blackCards: async (_, __, { dataSources }) =>
      dataSources.blackCardAPI.getBlackCards(),
    blackCardById: async (_, { blackCardId }, { dataSources }) =>
      dataSources.blackCardAPI.getBlackCardId({ blackCardId: blackCardId }),
    whiteCards: async (_, __, { dataSources }) =>
      dataSources.whiteCardAPI.getWhiteCards(),
    whiteCardById: async (_, { whiteCardId }, { dataSources }) =>
      dataSources.whiteCardAPI.getWhiteCardId({ whiteCardId: whiteCardId }),
    cardPacks: async (_, __, { dataSources }) =>
      dataSources.cardPackAPI.getCardPacks(),
    cardPackById: async (_, { cardPackId }, { dataSources }) =>
      dataSources.cardPackAPI.getCardPackId({ cardPackId }),
    me: async (_, __, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser(),
  },
  Mutation: {
    blackCardImport: async (_, { blackCards }, { dataSources }) => {
      return dataSources.blackCardAPI.importBlackCards({
        blackCards: blackCards,
      });
    },
    whiteCardImport: async (_, { whiteCards }, { dataSources }) => {
      return dataSources.whiteCardAPI.importWhiteCards({
        whiteCards: whiteCards,
      });
    },
    PostCardPack: async (_, { description }, { dataSources }) => {
      return dataSources.cardPackAPI.postCardPack({
        description: description,
      });
    },
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString("base64");
    },
  },
};
