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
