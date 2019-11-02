import gql from 'graphql-tag'
import { DocumentNode } from 'graphql';

export interface FriendsQuery {
  userId: string
};

export interface FriendshipMutation {
  initUserId: string
  confUserId: string
}

export interface DeleteFriendshipMutation {
  betweenUsers: string[]
}

export const schema: DocumentNode = gql`
  type Friendship {
    initUser: User
    confUser: User
    confirmed: Boolean
  }

  extend type Query {
    friendships: [Friendship]
    friends(userId: ID!): [Friendship]
  }

  extend type Mutation {
    createFriendship(
      initUserId: ID
      confUserId: ID!
    ): Friendship
    confirmFriendship(
      initUserId: ID!
      confUserId: ID
    ): Friendship
    deleteFriendship(
      betweenUsers: [ID]
    ): Boolean
  }
`;
export default schema;
