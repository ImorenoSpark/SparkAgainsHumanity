const { gql } = require("apollo-server");

const typeDefs = gql`
  """
  mutations
  """
  type Mutation {
    blackCardImport(blackCards: [blackCardInput]): [BlackCard]
    whiteCardImport(whiteCards: [whiteCardInput]): [WhiteCard]
    PostCardPack(description: String): CardPack
    login(email: String): User!
  }
  """
  inputs
  """
  input blackCardInput {
    description: String
    cardType: BlackCardType
    cardPackId: Int
  }
  input whiteCardInput {
    description: String
    cardPackId: Int
  }
  """
  queries
  """
  type Query {
    blackCards: [BlackCard]
    blackCardById(blackCardId: Int): BlackCard
    cardPacks: [CardPack]
    cardPackById(cardPackId: String): CardPack
    whiteCards: [WhiteCard]
    whiteCardById(WhiteCardId: Int): WhiteCard
    me: User
  }
  """
  types
  """
  type CardPack {
    cardPackId: Int
    description: String
  }
  type User {
    userId: ID!
    email: String!
    token: String
  }
  type BlackCard {
    blackCardId: Int
    description: String
    cardType: BlackCardType
  }
  type WhiteCard {
    whiteCardId: Int
    description: String
    cardPackId: Int
  }
  type Game {
    gameId: Int
    roundPlayingId: Int
    blackCardplayingId: Int
    currentCardCzarId: Int
  }
  type GamePlayer {
    gameId: Int
    userId: Int
    orderColumn: Int
  }
  type GamePlayerHand {
    gameId: Int
    userId: Int
    whiteCardId: Int
    orderColumn: Int
  }
  type GameRound {
    gameId: Int
    roundId: Int
    userId: Int
    blackCardId: Int
  }
  """
  enum
  """
  enum BlackCardType {
    S
    D
    T
  }
`;

module.exports = typeDefs;
