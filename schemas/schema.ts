import Entry from './Entry/schema';
import Friendship from './Friendship/schema';
import List from './List/schema';
import User from './User/schema';
import { DocumentNode } from 'graphql';

const schema: DocumentNode[] = [
  Entry,
  Friendship,
  List,
  User
];
export default schema;
