const { Sequelize } = require("sequelize");

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex((item) => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./store.SparkAgainstHumanity",
  });
  const cardPack = db.define("cardpack", {
    cardPackId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: Sequelize.STRING,
  });
  const blackCard = db.define("blackcard", {
    blackCardId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: Sequelize.STRING,
    cardType: Sequelize.STRING,
    cardPackId: Sequelize.INTEGER,
  });
  const whiteCard = db.define("whitecard", {
    whiteCardId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: Sequelize.STRING,
    cardPackId: Sequelize.INTEGER,
  });
  const gameRound = db.define("gameround", {
    gameId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    roundId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: Sequelize.INTEGER,
    blackCardId: Sequelize.INTEGER,
  });
  const gamePlayer = db.define("gameplayer", {
    gameId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    orderColumn: Sequelize.INTEGER,
  });
  const gamePlayerHand = db.define("gameplayerhand", {
    gameId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    whiteCardId: Sequelize.INTEGER,
    orderColumn: Sequelize.INTEGER,
  });

  const game = db.define("game", {
    gameId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roundPlayingId: Sequelize.INTEGER,
    blackCardPlayingId: Sequelize.INTEGER,
    currentCardCzarId: Sequelize.INTEGER,
  });

  const users = db.define("user", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    token: Sequelize.STRING,
  });

  return {
    db,
    users,
    cardPack,
    game,
    gamePlayer,
    gamePlayerHand,
    gameRound,
    whiteCard,
    blackCard,
  };
};
