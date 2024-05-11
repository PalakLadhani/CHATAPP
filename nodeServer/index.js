//Node Server which will handle sockert.io connection
const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  //(socket.io instance)
  socket.on("new-user-joined", (name) => {
    console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  }); //particular connection

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
});
