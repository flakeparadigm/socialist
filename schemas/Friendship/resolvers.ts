import { isUndefined } from 'lodash';
import { friendships, users, StoredFriendship } from '../mockData';
import { FriendsQuery, FriendshipMutation, DeleteFriendshipMutation } from './types';

function findFriendshipIndex(betweenUsers: string[]) {
  const [userId1, userId2] = betweenUsers;

  return friendships.findIndex((friendship) => (
    (
      friendship.initUserId === userId1
      && friendship.confUserId === userId2
    )
    || (
      friendship.initUserId === userId2
      && friendship.confUserId === userId1
    )
  ));
}

export default {
  Friendship: {
    initUser: ({ initUserId }: StoredFriendship) => users.find((user) => user.id === initUserId),
    confUser: ({ confUserId }: StoredFriendship) => users.find((user) => user.id === confUserId),
  },

  Query: {
    friendships: () => friendships,

    friends(obj: any, { userId }: FriendsQuery) {
      return friendships.filter((friendship) => (
        friendship.initUserId === userId || friendship.confUserId === userId
      ));
    },
  },

  Mutation: {
    createFriendship(obj: any, { initUserId, confUserId }: FriendshipMutation) {
      const existingIndex = findFriendshipIndex([initUserId, confUserId]);
      if (existingIndex !== -1) throw new Error(`Users ${initUserId} and ${confUserId} are already friends.`);

      const initUser = users.find((user) => user.id === initUserId);
      if (isUndefined(initUser)) throw new Error(`User ${initUserId} does not exist.`);

      const confUser = users.find((user) => user.id === confUserId);
      if (isUndefined(confUser)) throw new Error(`User ${confUserId} does not exist.`);

      const friendship = {
        initUserId,
        confUserId,
        confirmed: false,
      };

      friendships.push(friendship);
      return friendship;
    },

    confirmFriendship(obj: any, { initUserId, confUserId }: FriendshipMutation) {
      const toConfirmIndex = findFriendshipIndex([initUserId, confUserId]);
      if (toConfirmIndex === -1) throw new Error(`Friend request not found between ${initUserId} and ${confUserId}.`);

      const toConfirm = friendships[toConfirmIndex];
      toConfirm.confirmed = true;

      return toConfirm;
    },

    deleteFriendship(obj: any, { betweenUsers }: DeleteFriendshipMutation) {
      if (betweenUsers.length !== 2) throw new Error('You must provide two user IDs to delete the friendship between them.');

      // if current user is not one of the two, then error

      const [userId1, userId2] = betweenUsers;
      const toDeleteIndex = findFriendshipIndex(betweenUsers);

      if (toDeleteIndex === -1) throw new Error(`Users ${userId1} and ${userId2} are not friends.`);

      return delete friendships[toDeleteIndex];
    },
  },
};
