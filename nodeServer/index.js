const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("new-user-joined", (name) => {
    console.log("New user joined:", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name); // Broadcast to all clients except the sender
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
});
