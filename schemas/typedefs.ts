import Entry from './Entry/typedefs';
import Friendship from './Friendship/typedefs';
import List from './List/typedefs';
import User from './User/typedefs';
import { DocumentNode } from 'graphql';

const typedefs: DocumentNode[] = [
  Entry,
  Friendship,
  List,
  User
];
export default typedefs;
