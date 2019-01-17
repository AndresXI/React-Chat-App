/** Create HTTP server */
const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 4343;

// Socket function
const socket = require("./socket");

/** Make socket.io connection */
io.on('connection', socket);

app.listen(PORT, () => {
  console.log('CONNECTED TO PORT: ' + PORT);
});