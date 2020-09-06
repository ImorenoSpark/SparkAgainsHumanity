const { gql } = require("apollo-server");

const typeDefs = gql`
  """
  mutations
  """
  type Mutation {
    blackCardImport(blackCards: [blackCardInput]): [BlackCard]
    whiteCardImport(whiteCards: [whiteCardInput]): [WhiteCard]
    login(email: String): User!
  }
  """
  inputs
  """
  input blackCardInput {
    description: String
    cardType: BlackCardType
  }
  input whiteCardInput {
    description: String
  }
  """
  queries
  """
  type Query {
    blackCards: [BlackCard]
    blackCardById(blackCardId: Int): BlackCard
    whiteCards: [WhiteCard]
    whiteCardById(WhiteCardId: Int): WhiteCard
    me: User
  }
  """
  types
  """
  type User {
    id: ID!
    email: String!
    profileImage: String
    token: String
  }
  type BlackCard {
    blackCardId: Int
    description: String
    cardType: BlackCardType
  }
  type WhiteCard {
    whitecardId: Int
    description: String
  }
  type Game {
    gameId: Int
    roundPlayingId: Int
    blackCardplayingId: Int
    currentCardCzarId: Int
  }
  type GamePlayerHand {
    gameId: Int
    userId: Int
    whiteCardId: Int
    order: Int
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
