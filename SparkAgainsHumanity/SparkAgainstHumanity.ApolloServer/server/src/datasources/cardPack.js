const { DataSource } = require("apollo-datasource");

class CardPackAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }
  async getCardPacks() {
    return await this.store.cardPack.findAll();
  }
  async getCardPackId({ cardPackId }) {
    return await this.store.cardPack.findAll({
      where: { cardPackId },
    });
  }
  async postCardPack({ description }) {
    return await this.store.cardPack.findOrCreate({
      where: { description: description },
    });
  }
}

module.exports = CardPackAPI;
