function makeFriendsList(friends) {
  const friendsList = document.createElement('ul');
  for (const friend of friends) {
    const list = document.createElement('li')
    list.textContent = `${friend.firstName} ${friend.lastName}`;
    friendsList.append(list);
  }
  return friendsList;
}
