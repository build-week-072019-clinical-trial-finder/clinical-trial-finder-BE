const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", authRouter);
server.use("/api", usersRouter);

server.get("/", (req, res) => {
  res.send(
    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
  );
});

module.exports = server;
