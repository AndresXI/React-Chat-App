const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server);

const PORT = process.env.PORT || 4343;

const socket = require("./socket");

/** Send files from the build folder */
app.use(express.static(__dirname + '/../build'));

/** Make socket.io connection */
io.on('connection', socket);

server.listen(PORT, () => {
  console.log('CONNECTED TO PORT: ' + PORT);
});