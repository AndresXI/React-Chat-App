/** Library that creates uniques ids */
const uuidv4 = require('uuid/v4');

/**
 * Creates a user
 * @prop id {string}
 * @prop name { string }
 * @prop {object}
 * */
const createUser = ({name = ""} = {}) => (
  {
    id: uuidv4(),
    name
  }
);

/**
 * Creates a messages object
 * */
const createMessage = ({message = "", sender = ""} = {}) => (
  {
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
  }
);

/**
 * Create a Chat object
 * */
const createChat = ({messages = [], name = "Community", users = []} = {}) => (
  {
    id: uuidv4(),
    name,
    messages,
    users,
    typingUsers: []
  }
);

/**
 *@param date { Date }
 * @return {string} a string converted to a 24hr time
 * */
const getTime = (date) => {
  return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createUser,
  createMessage,
  createChat
};


