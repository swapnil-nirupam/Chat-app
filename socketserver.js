//handle socket connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
   socket.on('new-user-joined', nam => {
      console.log("new user", nam);
      users[socket.id] = nam;
      socket.broadcast.emit('user-joined', nam);
   });

   socket.on('send', message => {
      socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
   });

   //if someone leaves the room disconnect is in-built event which fires when someone is disconnected
   socket.on('disconnect', message =>{
      socket.broadcast.emit('leave', users[socket.id]);
      delete users[socket.id];
   })
});