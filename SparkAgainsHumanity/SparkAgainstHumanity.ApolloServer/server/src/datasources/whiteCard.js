const { DataSource } = require("apollo-datasource");

class WhiteCardAPI extends DataSource {
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
  async getWhiteCards() {
    return await this.store.whiteCard.findAll();
  }
  async getWhiteCardId({ whiteCardId }) {
    return await this.store.whiteCard.findAll({
      where: { whiteCardId },
    });
  }
  async importWhiteCards({ whiteCards }) {
    return await this.store.whiteCard
      .bulkCreate(whiteCards)
      .then(function () {
        // Notice: There are no arguments here, as of right now you'll have to...
        return this.store.whiteCard.findAll();
      })
      .then(function (whiteCardsCreated) {
        return whiteCardsCreated;
      });
  }
}

module.exports = WhiteCardAPI;
