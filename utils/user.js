const users = [];

// Join user to chat
export const userJoin = (id, username, room, host, presenter) => {
  const user = { id, username, room, host, presenter };

  users.push(user);
  return user;
};
// User leaves chat
export const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//get users
export const getUsers = (room) => {
  const RoomUsers = [];
  users.map((user) => {
    if (user.room == room) {
      RoomUsers.push(user);
    }
  });

  return RoomUsers;
};

