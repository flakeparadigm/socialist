import { merge } from 'lodash';

import Entry from './Entry/resolvers';
import Friendship from './Friendship/resolvers';
import List from './List/resolvers';
import User from './User/resolvers';

const resolvers: any = merge(
  {},
  Entry,
  Friendship,
  List,
  User
);
export default resolvers;
