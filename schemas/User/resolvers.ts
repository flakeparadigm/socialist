import { isUndefined } from 'lodash';
import { users, entries, StoredUser } from '../mockData';
import { UserQuery, UserInput } from './typedefs';

export default {
  User: {
    entries: ({ id }: StoredUser) => entries.filter((entry) => entry.creatorId === id),
  },

  Query: {
    user: (obj: any, { id }: UserQuery) => users.find((user) => user.id === id),
    users: () => users,
  },

  Mutation: {
    createUser(obj: any, { user }: { user: UserInput }) {
      if (!isUndefined(users.find((u) => u.id === user.id))) {
        throw new Error(`User ${user.id} already exists.`);
      }

      users.push(user);
      return user;
    },

    deleteUser(obj: any, { id }: UserQuery) {
      const userIndex = users.findIndex((user) => user.id === id);

      if (userIndex === -1) {
        throw new Error(`User ${id} does not exist.`);
      }

      return delete users[userIndex];
    },
  },
};
