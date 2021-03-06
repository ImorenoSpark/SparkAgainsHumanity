const { DataSource } = require("apollo-datasource");

class BlackCardAPI extends DataSource {
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
  async getBlackCards() {
    return await this.store.blackCard.findAll();
  }
  async getBlackCardId({ blackCardId }) {
    return await this.store.blackCard.findAll({
      where: { blackCardId },
    });
  }
  async importBlackCards({ blackCards }) {
    return await this.store.blackCard
      .bulkCreate(blackCards, { returning: true })
      .then(function (blackCardsCreated) {
        return blackCardsCreated;
      });
  }
}

module.exports = BlackCardAPI;
