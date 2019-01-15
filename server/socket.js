const io = require('./app').io;
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../src/Events.js');
const { createUser, createMessage, createChat } = require('../src/Factories.js');

/**
 * An object of Users
 * */
let connectedUsers = { };

module.exports = (socket) => {
  console.log('Socket ID: ' + socket.id);

  // verify Username
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user:null })
    } else {
      callback({ isUser: false, user: createUser({name: nickname}) })
    }
  });

  // User connects with username
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    // set variable on our socket
    socket.user = user;
    // Broadcast to all users
    io.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  });
};


/**
 * Checks if the user is in list passed in
 * */
function isUser(userList, username) {
  return username in userList;
}

/**
 * Removes a user from the list passed in.
 * */
function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList
}

/**
 * Adds a user to the list passed in
 * */
function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}
