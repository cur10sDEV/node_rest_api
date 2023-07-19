const { Server } = require("socket.io");

let io;

const initIO = (httpServer) => {
  io = new Server(httpServer);
};

const getIO = () => {
  if (!io) {
    throw new Error("SocketIo not initialized!");
  }
  return io;
};

module.exports = { initIO, getIO };
