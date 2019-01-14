const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 4343;

/** Make socket.io connection */
const socket = require("./socket");

io.on('connection', socket);

app.listen(PORT, () => {
  console.log('CONNECTED TO PORT: ' + PORT);
});