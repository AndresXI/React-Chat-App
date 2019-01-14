const io = require('./app').io;

module.exports = (socket) => {
  console.log('Socket ID: ' + socket.id);
}